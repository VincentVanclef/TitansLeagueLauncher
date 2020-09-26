import fs, { RmDirAsyncOptions } from 'fs';
import util from 'util';
import path from 'path';
import LogService from '@/services/logs/log.service';
import { lstatSync } from 'original-fs';
/*
  flags: https://nodejs.org/api/fs.html#fs_file_system_flags

*/

const existsfile = util.promisify(fs.exists);
const readfile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
const filestats = util.promisify(fs.stat);
const writefile = util.promisify(fs.writeFile);
const appendfile = util.promisify(fs.appendFile);
const existfolder = util.promisify(fs.exists);
const createfolder = util.promisify(fs.mkdir);
const removefolder = util.promisify(fs.rmdir);
const execFile = require('electron').shell;

export const isDirectory = (source: any) => lstatSync(source).isDirectory();

export interface IFileOptions {
	encoding?: FileEncodings | undefined;
	mode?: FileModes | undefined;
	flags?: FileFlags | undefined;
}

export enum FileFlags {
	Reading = 'r',
	ReadingCheckExistance = 'rx',
	Appending = 'a',
	AppendingCheckExistance = 'ax',
	Writing = 'w',
	WritingCheckExistance = 'wx'
}

export enum FileEncodings {
	utf8 = 'utf8'
}

export enum FileModes {}

type MakeDirectoryOptions = fs.MakeDirectoryOptions;

const removeDir = function(dirPath: string) {
	if (!fs.existsSync(dirPath)) {
		return;
	}

	const list = fs.readdirSync(dirPath);
	for (var i = 0; i < list.length; i++) {
		const filename = path.join(dirPath, list[i]);
		const stat = fs.statSync(filename);

		if (filename == '.' || filename == '..') {
			// do nothing for current and parent dir
		} else if (stat.isDirectory()) {
			removeDir(filename);
		} else {
			fs.unlinkSync(filename);
		}
	}

	fs.rmdirSync(dirPath);
};

class FileService {
	async ReadFile(path: string, options?: IFileOptions): Promise<string> {
		try {
			const data = await readfile(path, options);
			return data.toString();
		} catch (err) {
			LogService.Log('ReadFile', err);
			throw err;
		}
	}

	async ReadFileAs<T>(path: string, options?: IFileOptions) {
		try {
			const data = await readfile(path, options);
			return JSON.parse(data.toString()) as T;
		} catch (err) {
			LogService.Log('ReadFileAs', err);
			throw err;
		}
	}

	async ReadDirectory(path: string, options?: IFileOptions) {
		try {
			const data = await readdir(path, options);
			return data;
		} catch (err) {
			LogService.Log('ReadDirectory', err);
			throw err;
		}
	}

	async GetDirectories(path: string): Promise<string[]> {
		try {
			const result = await readdir(path, { withFileTypes: true });
			return result.filter((dirent: any) => dirent.isDirectory()).map((dirent: any) => dirent.name) as string[];
		} catch (err) {
			LogService.Log('GetDirectories', err);
			throw err;
		}
	}

	async CheckFile(path: string): Promise<boolean> {
		try {
			const result = await existsfile(path);
			return result;
		} catch (err) {
			LogService.Log('CheckFile', err);
			throw err;
		}
	}

	async GetFileStats(path: string): Promise<fs.Stats | null> {
		const exists = await this.CheckFile(path);
		if (!exists) return null;

		try {
			const stats = await filestats(path);
			return stats;
		} catch (err) {
			LogService.Log('GetFileStats', err);
			throw err;
		}
	}

	async WriteFile(path: string, data: string, options?: IFileOptions) {
		try {
			await writefile(path, data, options);
		} catch (err) {
			LogService.Log('WriteFile', err);
			throw err;
		}
	}

	async AppendFile(path: string, data: string, options?: IFileOptions) {
		try {
			await appendfile(path, data, options);
		} catch (err) {
			LogService.Log('AppendFile', err);
			throw err;
		}
	}

	async WriteObjectToFile(path: string, data: object, options?: IFileOptions) {
		try {
			await writefile(path, JSON.stringify(data), options);
		} catch (err) {
			LogService.Log('WriteObjectToFile', err);
			throw err;
		}
	}

	async ExistsFolder(path: string): Promise<boolean> {
		try {
			const result = await existfolder(path);
			return result;
		} catch (err) {
			LogService.Log('ExistsFolder', err);
			throw err;
		}
	}

	async CreateFolder(path: string, options?: MakeDirectoryOptions) {
		const exists = await this.ExistsFolder(path);
		if (exists) return;

		try {
			await createfolder(path, options);
		} catch (err) {
			LogService.Log('CreateFolder', err);
			throw err;
		}
	}

	async RemoveFolder(path: string, options?: RmDirAsyncOptions): Promise<boolean> {
		const exists = await this.ExistsFolder(path);
		if (!exists) return false;

		try {
			removeDir(path);
			return true;
		} catch (err) {
			LogService.Log('RemoveFolder', err);
			throw err;
		}
	}

	ExecuteFile(path: string, params?: string[]) {
		try {
			execFile.openItem(path);
		} catch (e) {
			LogService.Log('ExecuteFile', e);
			throw e;
		}
	}
}

export default new FileService();
