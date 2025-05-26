export type MongoUser = {
  _id: string;
  uid: string;
  name: string;
  uni: string;
  email: string;
  phone: string;
  gender: string;
  photoURL: string;
};

export async function fetchMongoData(token: string): Promise<MongoUser | null> {
  const res = await fetch(
    `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/user/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

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

export async function createUser(
  token: string,
  data: {
    uid: string;
    name: string;
    uni: string;
    email: string;
    photoURL: string;
    phone: string;
    gender: string;
  },
) {
  const res = await fetch(
    `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/user/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (res.ok) {
    const user: MongoUser = await res.json();

    return user;
  }

  throw new Error("Unexpected response ${res.status}");
}
