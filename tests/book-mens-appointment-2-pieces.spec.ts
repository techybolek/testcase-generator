import { test, expect } from '@playwright/test';

test.describe('Book Men\'s Appointment - 2 Pieces', () => {
  test('should successfully book an appointment for Men\'s Alterations with 2 pieces', async ({ page }) => {
    // Test Data
    const email = 'elabradlly@gmail.com';
    const password = 'password12345#';

    // Step 1: Navigate to Application
    await page.goto('https://customer-portal-flame-seven.vercel.app');
    await page.waitForLoadState('networkidle');

    // Check if already logged in (redirected to profile) or need to login
    const isOnProfile = page.url().includes('/profile');

    if (!isOnProfile) {
      // Step 2: Enter Email Address
      await page.getByRole('textbox', { name: 'Enter your email' }).fill(email);

      // Step 3: Enter Password
      await page.getByRole('textbox', { name: 'Enter your password' }).fill(password);

      // Step 4: Click Sign In
      await page.getByRole('button', { name: 'Sign In' }).click();

      // Wait for login to complete and redirect to profile
      await page.waitForURL(/\/profile/);
    }

    await expect(page.getByText('Welcome back, Ela!')).toBeVisible({ timeout: 10000 });

    // Step 5: Click Book Appointment
    await page.getByRole('button', { name: 'Book Appointment' }).click();

    // Wait for appointments page to load
    await page.waitForURL(/\/appointments/);
    await expect(page.getByRole('heading', { name: 'Choose Service' })).toBeVisible({ timeout: 10000 });

    // Step 6: Select Men's Alterations Service
    await page.getByTestId('service-option-mens-alterations').click();

    // Wait for modal to appear
    await expect(page.getByText('How many items are you bringing?')).toBeVisible({ timeout: 5000 });

    // Step 7: Increase Item Count to 2
    await page.getByTestId('item-count-modal-increase').click();

    // Verify item count is now 2 and duration is 30 minutes
    await expect(page.getByText('30 minutes')).toBeVisible();

    // Step 8: Click Continue in Modal
    await page.getByTestId('item-count-modal-continue').click();

    // Wait for date selection page
    await page.waitForURL(/\/appointments\/date/);
    await expect(page.getByRole('heading', { name: 'Select Date, Tailor & Time' })).toBeVisible({ timeout: 10000 });

    // Step 9: Select Available Date
    // Get today's date and find an available future date
    const today = new Date();
    const dayOfMonth = today.getDate();

    // Try to click on a date that's likely available (today + 1 or later)
    let dateSelected = false;
    for (let i = 1; i <= 7; i++) {
      const targetDay = (dayOfMonth + i).toString();
      const dateButton = page.getByRole('button', { name: targetDay, exact: true });

      // Check if button exists and is not disabled
      if (await dateButton.count() > 0) {
        const isDisabled = await dateButton.isDisabled().catch(() => true);
        if (!isDisabled) {
          await dateButton.click();
          dateSelected = true;
          break;
        }
      }
    }

    if (!dateSelected) {
      // Fallback: try clicking the first available enabled date button
      const allDayButtons = page.locator('button').filter({ hasText: /^\d{1,2}$/ });
      const count = await allDayButtons.count();
      for (let i = 0; i < count; i++) {
        const btn = allDayButtons.nth(i);
        if (!(await btn.isDisabled().catch(() => true))) {
          await btn.click();
          break;
        }
      }
    }

    // Wait for tailor selection to appear
    await expect(page.getByText('Selected Date')).toBeVisible({ timeout: 5000 });

    // Step 10: Select Tailor
    // The tailor appears as a button with the name "Olga Akimova Olga Akimova" (image alt + text)
    const tailorButton = page.getByRole('button', { name: 'Olga Akimova Olga Akimova' });
    await expect(tailorButton).toBeVisible({ timeout: 5000 });
    await tailorButton.click();

    // Wait for time slots section to appear after selecting tailor
    await expect(page.getByRole('heading', { name: 'Select Time' })).toBeVisible({ timeout: 5000 });

    // Step 11: Select Time Slot (select the first available time slot)
    // Time slots vary by date, so we select the first available one
    const timeSlotButtons = page.locator('button').filter({ hasText: /^\d{1,2}:\d{2}\s*(AM|PM)$/ });
    await expect(timeSlotButtons.first()).toBeVisible({ timeout: 5000 });
    await timeSlotButtons.first().click();

    // Step 12: Click Select to Proceed
    await page.getByRole('button', { name: 'Select' }).click();

    // Wait for details page
    await page.waitForURL(/\/appointments\/details/);

    // Step 13: Verify Appointment Details
    await expect(page.getByText('Men\'s Alterations', { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('2', { exact: true })).toBeVisible(); // Number of items
    await expect(page.getByText('30 min', { exact: true })).toBeVisible(); // Duration
    await expect(page.getByText('Olga Akimova').first()).toBeVisible(); // Tailor name

    // Step 14: Click Confirm Appointment
    await page.getByTestId('confirm-appointment-btn').click();

    // Step 15: Verify Booking Confirmation
    await page.waitForURL(/\/appointments\/confirmation/);

    // Wait for confirmation to complete (heading changes from "Confirming..." to "Appointment Confirmed!")
    await expect(page.getByRole('heading', { name: 'Appointment Confirmed!' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Your appointment for Men\'s Alterations has been successfully booked.')).toBeVisible();
    await expect(page.getByText('Confirmation Code')).toBeVisible();

    // Verify confirmation code is displayed (6 alphanumeric characters)
    // The confirmation code is in a generic element next to "Confirmation Code" text
    const confirmationCodeSection = page.locator('text=Confirmation Code').locator('..').locator('div').last();
    const confirmationCode = await confirmationCodeSection.textContent();
    expect(confirmationCode).toMatch(/^[A-Z0-9]{6}$/);

    // Verify action buttons are present
    await expect(page.getByRole('button', { name: 'Add to Calendar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'View All Appointments' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Book Another' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to Home' })).toBeVisible();
  });
});
