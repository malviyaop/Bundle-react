const fs = require('fs');
const config = require("../../config.json")

var file_content = fs.readFileSync("./utils/scripts/compileCode.sh");
file_content = file_content.toString();
const contract_name = config.compile_config.contract_name;
const class_name = config.compile_config.class_name;
const test_contract = config.test_config.contract_name;

fs.writeFileSync("./utils/scripts/compileCode.sh", `./utils/SmartPyBasic/SmartPy.sh compile ./contract/${contract_name} "${class_name}" ./contract_build`);
fs.writeFileSync("./utils/scripts/checkScenario.sh", 
`
echo " --------------------------------";
echo " Testing your SmartContract .... ";
echo " --------------------------------";
printf "\n Test Summary : \n"
echo " ------------------";
./utils/SmartPyBasic/SmartPy.sh test ./contract/${test_contract} ./test-build;
printf "\n Test Scenarios :\n";
echo " -------------------"
cat ./test-build/Welcome_interpreted/scenario-interpreter-log.txt;
printf "\n\n"
`)
console.log("Contract Synced !\n");

console.log("To compile your SmartPy code : npm run compile\n");