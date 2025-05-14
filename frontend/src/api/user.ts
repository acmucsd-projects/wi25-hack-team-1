export type MongoUser = {
  _id: string;
  uid: string;
  firstname: string;
  lastname: string;
  uni: string;
  email: string;
  phone: string;
  gender: string;
  photoURL: string;
};

export async function fetchMongoData(token: string): Promise<MongoUser | null> {
  const res = await fetch("http://localhost:3000/api/user/whoami", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const user: MongoUser = await res.json();
    return user;
  }

  if (res.status == 404) {
    console.log("404 error");
    return null;
  }

  throw new Error("Unexpected response ${res.status}");
}
