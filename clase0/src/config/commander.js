import { Command } from "commander";

const program = new Command()
program
    .option("-d, --debug", "output extra debugging",false)
    .option("-p --port <port>","specify port",8080)
    .option("-m --mode <mode>","specify mode","development")
    .requiredOption("-u --username <username>","specify username")
    .option("-l --letters [letter...]","specify letter")
    
program.parse()
export const options = program.opts()
