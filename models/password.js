import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperPassword = process.env.PEPPER + password;
  return await bcryptjs.hash(pepperPassword, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const passwordPeppered = process.env.PEPPER + providedPassword;
  return await bcryptjs.compare(passwordPeppered, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
