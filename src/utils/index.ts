let jwtToken: any;


if (typeof window !== "undefined") {
  jwtToken = localStorage.getItem("clerk-db-jwt");

} else {
  console.log("Cannot access localStorage on the server side.");
}