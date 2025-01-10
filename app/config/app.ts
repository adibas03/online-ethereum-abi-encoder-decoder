import packageJson from "package.json"

const title = "Online Ethereum abi encoder and decoder",
  description = packageJson.description,
  author = {
    name: packageJson.author.name,
    email: packageJson.author.email,
    github: "https://github.com/adibas03",
  };

export { title, description, author };
