import fs from "fs";
import util from "util";

const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

interface IReadFileOptions {
  encoding: "utf8";
}

class FileService {
  async ReadFile(
    path: string,
    options: IReadFileOptions = {
      encoding: "utf8"
    }
  ): Promise<string> {
    try {
      const data = await readfile(path, options);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async CreateFile(path: string, data: string) {
    try {
      await writefile(path, data, {
        flag: "wx"
      });
    } catch (err) {
      throw err;
    }
  }
}

export default new FileService();
