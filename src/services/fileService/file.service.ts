import fs from "fs";
import util from "util";

/*
  flags: https://nodejs.org/api/fs.html#fs_file_system_flags

*/

const existsfile = util.promisify(fs.exists);
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);
const existfolder = util.promisify(fs.exists);
const createfolder = util.promisify(fs.mkdir);

export interface IFileOptions {
  encoding?: FileEncodings | undefined;
  mode?: FileModes | undefined;
  flags?: FileFlags | undefined;
}

export enum FileFlags {
  Reading = "r",
  ReadingCheckExistance = "rx",
  Appending = "a",
  AppendingCheckExistance = "ax",
  Writing = "w",
  WritingCheckExistance = "wx"
}

export enum FileEncodings {
  utf8 = "utf8"
}

export enum FileModes {}

type MakeDirectoryOptions = fs.MakeDirectoryOptions;

class FileService {
  async ReadFile(path: string, options?: IFileOptions): Promise<string> {
    try {
      const data = await readfile(path, options);
      return data.toString();
    } catch (err) {
      throw err;
    }
  }

  async ReadFileAs<T>(path: string, options?: IFileOptions) {
    try {
      const data = await readfile(path, options);
      return JSON.parse(data.toString()) as T;
    } catch (err) {
      throw err;
    }
  }

  async CheckFile(path: string): Promise<boolean> {
    try {
      const result = await existsfile(path);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async WriteFile(path: string, data: string, options?: IFileOptions) {
    try {
      await writefile(path, data, options);
    } catch (err) {
      throw err;
    }
  }

  async WriteObjectToFile(path: string, data: object, options?: IFileOptions) {
    try {
      await writefile(path, JSON.stringify(data), options);
    } catch (err) {
      throw err;
    }
  }

  async ExistsFolder(path: string): Promise<boolean> {
    try {
      const result = await existfolder(path);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async CreateFolder(path: string, options?: MakeDirectoryOptions) {
    const exists = await this.ExistsFolder(path);
    if (exists) return;

    try {
      await createfolder(path, options);
    } catch (err) {
      throw err;
    }
  }
}

export default new FileService();
