import { test, expect } from "playwright-test-coverage";

test("franchise page", async ({ page }) => {
  await page.goto("/");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByRole("main")).toContainText(
    "So you want a piece of the pie?"
  );
});

test("franchise login", async ({ page }) => {
  await page.route("*/**/api/franchise/4", async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: "pizzaPocket",
        admins: [
          {
            id: 4,
            name: "pizza franchisee",
            email: "f@jwt.com",
          },
        ],
        stores: [
          {
            id: 4,
            name: "SLC",
            totalRevenue: 0,
          },
        ],
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: franchiseRes });
  });

  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "f@jwt.com", password: "franchisee" };
    const loginRes = {
      user: {
        id: 4,
        name: "pizza franchisee",
        email: "f@jwt.com",
        roles: [{ role: "franchisee" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.goto("/");
  await page.goto("http://localhost:5173/");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await page.getByRole("link", { name: "login", exact: true }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("main")).toContainText(
    "Everything you need to run an JWT Pizza franchise. Your gateway to success."
  );
});

test("create store", async ({ page }) => {
  await page.route("*/**/api/franchise/4", async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: "pizzaPocket",
        admins: [
          {
            id: 4,
            name: "pizza franchisee",
            email: "f@jwt.com",
          },
        ],
        stores: [
          {
            id: 4,
            name: "SLC",
            totalRevenue: 0,
          },
        ],
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: franchiseRes });
  });

  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "f@jwt.com", password: "franchisee" };
    const loginRes = {
      user: {
        id: 4,
        name: "pizza franchisee",
        email: "f@jwt.com",
        roles: [{ role: "franchisee" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route("*/**/api/franchise/1/store", async (route) => {
    const storeReq = { franchiseId: 1, name: "testStore" };
    const storeRes = { id: 1, franchiseId: 1, name: "testStore" };
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject(storeReq);
    await route.fulfill({ json: storeRes });
  });

  await page.goto("/");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await page.getByRole("link", { name: "login", exact: true }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("f@jwt.com");
  await page.getByRole("textbox", { name: "Password" }).fill("franchisee");
  await page.getByRole("button", { name: "Login" }).click();

  await page.goto("/franchise-dashboard");

  await page.getByRole("button", { name: "Create store" }).click();
  await page.getByRole("textbox", { name: "store name" }).fill("testStore");
  await page.getByRole("button", { name: "Create" }).click();
});
