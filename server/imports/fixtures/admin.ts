export function createAdmin(){
  let adminMail = "fs@aplido.de";
  let adminId;
  let admin = Accounts.findUserByEmail(adminMail);
  if(!admin){
    adminId = Accounts.createUser({
      email: adminMail,
      password: "admin01!",
      profile: {
        firstName: "Florian",
        lastName: "Schmid"
      }
    });
    console.log("Owner created with id: " + adminId);
    Meteor.call("initializeNewUser", adminId);
  } else {
    console.log("Owner already exists.");
  }
  return adminId;
}
