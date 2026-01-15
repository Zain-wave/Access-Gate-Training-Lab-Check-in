function validateAge(age) {
  return age >= 18;
}

function validateRole(role) {
  const validRoles = ["coder", "tutor", "visitor"];
  return validRoles.includes(role);
}

function calculateRisk(user) {
  let risk = 0;

  if (user.availableHours < 2) {
    risk += 1;
  }
  if (user.role === "visitor") {
    risk += 1;
  }
  if (user.age >= 18 && user.age <= 20) {
    risk += 1;
  }

  if (user.role === "coder" && user.availableHours >= 4) {
    risk -= 1;
  }

  // Riesgo no sea negativo
  return Math.max(0, risk);
}

// Entrada de datos

const fullName = prompt("Enter your full name:").trim();
const age = Number(prompt("Enter your age:").trim());
const role = prompt("Enter your role (Coder/Tutor/Visitor):")
  .toLowerCase()
  .trim();
const acceptsRules =
  prompt("Do you accept the lab rules? (yes/no):").toLowerCase().trim() ===
  "yes";
const availableHours = Number(prompt("Available hours today (1-12):").trim());

alert("System processing your check-in...");

//Guardo los datos del usuario en un objeto
const user = {
  name: fullName,
  age: age,
  role: role,
  acceptsRules: acceptsRules,
  availableHours: availableHours,
};

//Valido los datos
const isAdult = validateAge(user.age);
const validRole = validateRole(user.role);
const riskScore = calculateRisk(user);

// Tomar decisión
let decision = "";
let reason = "";

if (!isAdult) {
  decision = "DENY";
  reason = "Not an adult (under 18)";
} else if (!user.acceptsRules) {
  decision = "DENY";
  reason = "Did not accept lab rules";
} else if (!validRole) {
  decision = "DENY";
  reason = "Invalid role";
} else if (riskScore >= 2) {
  decision = "REVIEW";
  reason = "High risk score";
} else {
  decision = "ALLOW";
  reason = "All criteria met";
}

//Pasos
const processSteps = [
  "Validating user data",
  "Checking minimum age",
  "Validating user role",
  "Calculating risk score",
  "Generating final decision",
];

console.log("=== Pasos mediante loop ===");
for (let i = 0; i < processSteps.length; i++) {
  console.log(`Step ${i + 1}: ${processSteps[i]}`);
}

// Salida de datos
console.log("\n=== USER INFORMATION ===");
console.log("User object:", user);
console.log("Risk score:", riskScore);
console.log("Final decision:", decision);
console.log("Reason:", reason);

// Alertas en base a la decisión
if (decision === "DENY") {
  alert(
    `ACCESS DENIED\n\nReason: ${reason}\nRole: ${user.role}\n\nYou cannot enter the training lab.`
  );
} else if (decision === "REVIEW") {
  alert(
    `ACCESS UNDER REVIEW\n\nReason: ${reason}\nRole: ${user.role}\nRisk score: ${riskScore}\n\nPlease wait for additional instructions.`
  );
} else if (decision === "ALLOW") {
  alert(
    `ACCESS GRANTED\n\nReason: ${reason}\nRole: ${user.role}\n\nWelcome to the training lab, ${user.name}!`
  );
}
