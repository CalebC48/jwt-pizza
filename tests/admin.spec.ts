import { test, expect } from "playwright-test-coverage";

test("admin login", async ({ page }) => {
  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "a@jwt.com", password: "admin" };
    const loginRes = {
      user: {
        id: 4,
        name: "pizza admin",
        email: "a@jwt.com",
        roles: [{ role: "admin" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Email address" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Admin" }).click();

  // await page.getByRole('button', { name: 'Add Franchise' }).click();
  // await page.getByRole('textbox', { name: 'franchise name' }).click();
  // await page.getByRole('textbox', { name: 'franchise name' }).fill('testFranchise');
  // await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  // await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('t@jwt.com');
  // await page.getByRole('button', { name: 'Create' }).click();
});
