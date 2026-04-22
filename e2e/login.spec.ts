import { test, expect } from "@playwright/test";

test("login → ver grid de produtos", async ({ page }) => {
  // 1. acessar login
  await page.goto("http://localhost:3000/login");

  // 2. preencher login
  await page.fill('input[name="email"]', "dinamica");
  await page.fill('input[name="senha"]', "123");

  // 3. enviar
  await page.click('button[type="submit"]');

  // 4. esperar redirecionamento
  await page.waitForURL("**/produtos");

  // 5. validar que carregou produtos
  await expect(page.locator("text=confira").first()).toBeVisible();
});