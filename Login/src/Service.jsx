export async function fetchUser() {
  console.log(JSON.parse(localStorage.getItem("type")));
  if (JSON.parse(localStorage.getItem("type")) == null) {
    window.open("http://localhost:3000/logout", "_self");
    return false;
  }
  if (JSON.parse(localStorage.getItem("type")) == "google") {
    const res = fetch("http://localhost:3000/auth/google/success", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await res).json();
  } else if (JSON.parse(localStorage.getItem("type")) == "form") {
    const res = fetch("http://localhost:3000/dataToken", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });
    return (await res).json();
  }
}
