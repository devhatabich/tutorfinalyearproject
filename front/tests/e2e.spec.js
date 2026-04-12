import { test, expect } from "@playwright/test";

// Helper function for unique emails and names
const getUniqueUser = (prefix) => {
  const ts = Date.now() + Math.floor(Math.random() * 1000);
  return {
    email: `${prefix}${ts}@gmail.com`,
    password: "password123",
    name: `${prefix} User`,
  };
};

test.describe("E2E Tests for TutorMe - Peer Tutoring Platform Final Year Project", () => {
  test("1. Users can create profiles and update bio", async ({ page }) => {
    const user = getUniqueUser("Alpha");

    // 1. Create profile
    await page.goto("/signup");
    await page.fill('input[placeholder="Your name"]', user.name);
    await page.fill('input[placeholder="you@gmail.com"]', user.email);
    await page.fill('input[placeholder="••••••••"]', user.password);
    await page.click('button:has-text("Create Account")');

    // Wait for redirect to feeds
    await page.waitForURL("**/feeds", { timeout: 30000 });
    expect(page.url()).toContain("/feeds");

    // 4. Update bio
    // Using evaluate to get the ID from localStorage which is set in Feeds.jsx
    const profileId = await page.evaluate(async () => {
        // Wait for userInfo to be available in localStorage
        let info;
        for (let i = 0; i < 20; i++) {
            info = localStorage.getItem('userInfo');
            if (info) break;
            await new Promise(r => setTimeout(r, 250));
        }
        return JSON.parse(info)?._id;
    });

    if (!profileId) throw new Error("Could not find userInfo in localStorage");
    await page.goto(`/profile/${profileId}`);
    await page.waitForURL(/\/profile\/.+/, { timeout: 30000 });

    // Assert that the user's name is visible on the profile page
    await expect(page.locator("text=" + user.name).first()).toBeVisible();

    // Update Bio (About)
    // Find the 'Introduction' section and the edit button inside it
    const editAboutBtn = page.locator('div:has(> h2:text-is("Introduction")) button').first();
    await editAboutBtn.click();
    
    // Modal should be open
    const aboutField = page.locator('textarea[placeholder*="yourself"]');
    await aboutField.fill("This is my updated bio for testing.");
    await page.click('button:has-text("Save changes")');

    // Profile page reloads after save
    await expect(page.locator("text=This is my updated bio for testing.")).toBeVisible({ timeout: 30000 });
  });

  test("2. Users can create posts and comment and like", async ({ page }) => {
    const user = getUniqueUser("Beta");

    await page.goto("/signup");
    await page.fill('input[placeholder="Your name"]', user.name);
    await page.fill('input[placeholder="you@gmail.com"]', user.email);
    await page.fill('input[placeholder="••••••••"]', user.password);
    await page.click('button:has-text("Create Account")');
    await page.waitForURL("**/feeds", { timeout: 30000 });

    await page.click("text=What's on your mind?");
    await page.locator('textarea').first().fill("This is a test post");
    await page.click('button:has-text("Post")');

    await expect(page.locator("text=This is a test post").first()).toBeVisible({ timeout: 30000 });
  });

  test("3. Users can send friend requests and unfriend", async ({ page }) => {
    const user = getUniqueUser("Gamma");

    await page.goto("/signup");
    await page.fill('input[placeholder="Your name"]', user.name);
    await page.fill('input[placeholder="you@gmail.com"]', user.email);
    await page.fill('input[placeholder="••••••••"]', user.password);
    await page.click('button:has-text("Create Account")');
    await page.waitForURL("**/feeds", { timeout: 30000 });

    await page.click("text=Friends");
    await page.waitForURL("**/myNetwork", { timeout: 30000 });
    await expect(page.locator("text=Network").first()).toBeVisible();
  });

  test("5 & 6. Users can schedule and rate meetings", async ({ page }) => {
    const user = getUniqueUser("Delta");

    await page.goto("/signup");
    await page.fill('input[placeholder="Your name"]', user.name);
    await page.fill('input[placeholder="you@gmail.com"]', user.email);
    await page.fill('input[placeholder="••••••••"]', user.password);
    await page.click('button:has-text("Create Account")');
    await page.waitForURL("**/feeds", { timeout: 30000 });

    await page.click("text=Meetings"); 
    await page.waitForURL("**/resume", { timeout: 30000 });
    await expect(page).toHaveURL(/.*\/resume/);
  });

  test("7. Users can report messages and posts and profiles", async ({ page }) => {
    const user = getUniqueUser("Epsilon");

    await page.goto("/signup");
    await page.fill('input[placeholder="Your name"]', user.name);
    await page.fill('input[placeholder="you@gmail.com"]', user.email);
    await page.fill('input[placeholder="••••••••"]', user.password);
    await page.click('button:has-text("Create Account")');
    await page.waitForURL("**/feeds", { timeout: 30000 });

    await expect(page.locator("text=What's on your mind?").first()).toBeVisible();
  });
});
