import path from "path";
import fs from "fs";
import { Context } from "../context.types";
import { log } from "../../logger";

export default class FileStorage {
  private _ctxfilePath: string;
  private _ctxCounterPath: string;

  constructor() {
    this._ctxfilePath = path.join(
      __dirname,
      "context.storage.json"
    );
    this._ctxCounterPath = path.join(
      __dirname,
      "ctxcounter.storage.json"
    );
  }

  public async setContext(ctx: Context): Promise<void> {
    const ctxStr = JSON.stringify(ctx);
    await fs.writeFileSync(this._ctxfilePath, ctxStr, { flag: "w+" });

    log("Save context", JSON.parse(ctxStr ?? ""));
  }

  public async getContext(): Promise<Context> {
    const content = await fs.readFileSync(this._ctxfilePath, "utf-8");
    const ctx = JSON.parse(content) as Context;
    return ctx;
  }

  // counter id generation
  public async getConter(): Promise<number> {
    if (!(await fs.existsSync(this._ctxCounterPath))) {
      await this.setCounter(0);
    }
    const content = await fs.readFileSync(this._ctxCounterPath, "utf-8");
    const counter = (Number(content) ?? 0) + 1;
    await this.setCounter(counter);
    return counter;
  }
  private async setCounter(counter: number): Promise<void> {
    await fs.writeFileSync(this._ctxCounterPath, String(counter), {
      flag: "w+",
    });
  }
}
