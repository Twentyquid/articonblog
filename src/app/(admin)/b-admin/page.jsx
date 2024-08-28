import { login } from "@/lib/login";

function AdminPage() {
  return (
    <>
      <h1>Admin Page</h1>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
        }}
      >
        <input name="email" type="email" placeholder="Email" />
        <input placeholder="password" type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AdminPage;
