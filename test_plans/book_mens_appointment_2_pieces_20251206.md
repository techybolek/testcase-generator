# Test Case Plan: Book Men's Appointment (2 Pieces)

## Metadata
- **Generated**: December 6, 2025
- **Initial URL**: https://customer-portal-flame-seven.vercel.app
- **Business Scenario**: Book an appointment for Men's Alterations with 2 pieces and verify successful booking

---

## Test Objective
Validate that a logged-in user can successfully book an appointment for Men's Alterations service with 2 pieces, selecting a date, tailor, and time slot, and receive a confirmation with a confirmation code.

---

## Pre-conditions
1. Browser is open and accessible
2. Valid user credentials available (stored in .env file)
3. User account exists in the system
4. At least one tailor has available time slots

---

## Test Data Requirements
- **Email**: `elabradlly@gmail.com` (from .env: `login_user`)
- **Password**: `password12345#` (from .env: `login_password`)
- **Service Type**: Men's Alterations
- **Number of Items**: 2
- **Expected Duration**: 30 minutes (15 min/piece × 2 items)

---

## Test Steps

### Step 1: Navigate to Application
- **Description**: Open the customer portal login page
- **Action**: Navigate to URL
- **URL**: `https://customer-portal-flame-seven.vercel.app`
- **Expected Result**: Login page is displayed with email and password fields

### Step 2: Enter Email Address
- **Description**: Enter user email in the email field
- **Target Element**: Email input textbox
- **Element Selector**: `getByRole('textbox', { name: 'Enter your email' })`
- **Input Data**: `elabradlly@gmail.com`
- **Expected Result**: Email is entered in the field

### Step 3: Enter Password
- **Description**: Enter user password in the password field
- **Target Element**: Password input textbox
- **Element Selector**: `getByRole('textbox', { name: 'Enter your password' })`
- **Input Data**: `password12345#`
- **Expected Result**: Password is entered in the field (masked)

### Step 4: Click Sign In
- **Description**: Submit the login form
- **Target Element**: Sign In button
- **Element Selector**: `getByRole('button', { name: 'Sign In' })`
- **Expected Result**:
  - User is redirected to `/profile` page
  - Welcome message displays user's name ("Welcome back, Ela!")
  - Toast notification shows "Login successful!"

### Step 5: Click Book Appointment
- **Description**: Navigate to appointment booking flow
- **Target Element**: Book Appointment button in header
- **Element Selector**: `getByRole('button', { name: 'Book Appointment' })`
- **Expected Result**:
  - User is redirected to `/appointments` page
  - Service selection page is displayed with heading "Choose Service"

### Step 6: Select Men's Alterations Service
- **Description**: Choose the Men's Alterations service option
- **Target Element**: Men's Alterations service card
- **Element Selector**: `getByTestId('service-option-mens-alterations')`
- **Alternative Selector**: Radio button within Men's Alterations card
- **Expected Result**:
  - Service is selected (radio checked)
  - Modal dialog appears asking "How many items are you bringing?"

### Step 7: Increase Item Count to 2
- **Description**: Click the plus button to increase items from 1 to 2
- **Target Element**: Plus (+) button in item count modal
- **Element Selector**: `getByTestId('item-count-modal-increase')`
- **Expected Result**:
  - Item count displays "2"
  - Duration updates to "30 minutes"
  - Duration calculation shows "15 min/piece × 2 items"

### Step 8: Click Continue in Modal
- **Description**: Confirm the item count and proceed
- **Target Element**: Continue button in modal
- **Element Selector**: `getByTestId('item-count-modal-continue')`
- **Expected Result**:
  - Modal closes
  - User is redirected to `/appointments/date` page
  - Calendar is displayed with heading "Select Date, Tailor & Time"

### Step 9: Select Available Date
- **Description**: Click on an available date (first available)
- **Target Element**: Date button (e.g., "7" for December 7)
- **Element Selector**: `getByRole('button', { name: '7', exact: true })`
- **Note**: Past dates are disabled; select first available date
- **Expected Result**:
  - Date is selected
  - "Selected Date" section appears showing the chosen date
  - Tailor selection section appears

### Step 10: Select Tailor
- **Description**: Choose an available tailor
- **Target Element**: Tailor option button (e.g., "Olga Akimova")
- **Element Selector**: `getByRole('button', { name: 'Olga Akimova Olga Akimova' })`
- **Expected Result**:
  - Tailor is selected
  - "Selected Tailor" label appears
  - Time slot selection section appears

### Step 11: Select Time Slot
- **Description**: Choose an available time slot
- **Target Element**: Time slot button (e.g., "9:00 AM")
- **Element Selector**: `getByRole('button', { name: '9:00 AM' })`
- **Expected Result**:
  - Time slot is selected (button becomes active)
  - "Select" button becomes enabled

### Step 12: Click Select to Proceed
- **Description**: Confirm date, tailor, and time selection
- **Target Element**: Select button
- **Element Selector**: `getByRole('button', { name: 'Select' })`
- **Expected Result**:
  - User is redirected to `/appointments/details` page
  - Appointment summary is displayed

### Step 13: Verify Appointment Details
- **Description**: Review the appointment summary before confirmation
- **Expected Visible Elements**:
  - Service: "Men's Alterations"
  - Items: "2"
  - Duration: "30 min" with "15 min/piece × 2"
  - Date & Time: Selected date and time
  - Tailor: Selected tailor name
  - QR Code image
  - Optional notes text area
- **Expected Result**: All details match the selections made

### Step 14: Click Confirm Appointment
- **Description**: Finalize the appointment booking
- **Target Element**: Confirm Appointment button
- **Element Selector**: `getByTestId('confirm-appointment-btn')`
- **Expected Result**:
  - User is redirected to `/appointments/confirmation` page
  - Loading state shows "Confirming your appointment..."

### Step 15: Verify Booking Confirmation
- **Description**: Confirm successful booking and verify confirmation details
- **Wait Condition**: Wait for confirmation page to load (heading changes from "Confirming..." to "Appointment Confirmed")
- **Expected Visible Elements**:
  - Heading: "Appointment Confirmed!"
  - Success message: "Your appointment for Men's Alterations has been successfully booked."
  - Confirmation Code: 6-character alphanumeric code (e.g., "8DEASW")
  - Service summary with all details
  - QR Code
  - Action buttons: "Add to Calendar", "View All Appointments", "Book Another", "Back to Home"
- **Expected Result**: Confirmation page displays with unique confirmation code

---

## UI Elements Identified

| Element | Type | Selector | Description |
|---------|------|----------|-------------|
| Email Input | textbox | `getByRole('textbox', { name: 'Enter your email' })` | Login email field |
| Password Input | textbox | `getByRole('textbox', { name: 'Enter your password' })` | Login password field |
| Sign In Button | button | `getByRole('button', { name: 'Sign In' })` | Submits login form |
| Book Appointment | button | `getByRole('button', { name: 'Book Appointment' })` | Navigates to booking flow |
| Men's Alterations | radio card | `getByTestId('service-option-mens-alterations')` | Service selection option |
| Item Count (+) | button | `getByTestId('item-count-modal-increase')` | Increases item count |
| Item Count (-) | button | `getByTestId('item-count-modal-decrease')` | Decreases item count |
| Continue (Modal) | button | `getByTestId('item-count-modal-continue')` | Confirms item count |
| Cancel (Modal) | button | Modal cancel button | Cancels item selection |
| Date Buttons | button | `getByRole('button', { name: '<day>' })` | Calendar date selection |
| Tailor Options | button | `getByRole('button', { name: '<tailor name>' })` | Tailor selection |
| Time Slots | button | `getByRole('button', { name: '<time>' })` | Time slot selection |
| Select Button | button | `getByRole('button', { name: 'Select' })` | Confirms date/time/tailor |
| Notes Textarea | textbox | Notes input field | Optional appointment notes |
| Confirm Appointment | button | `getByTestId('confirm-appointment-btn')` | Finalizes booking |
| Add to Calendar | button | `getByRole('button', { name: 'Add to Calendar' })` | Adds to user's calendar |
| View All Appointments | button | `getByRole('button', { name: 'View All Appointments' })` | Shows all appointments |
| Book Another | button | `getByRole('button', { name: 'Book Another' })` | Starts new booking |
| Back to Home | button | `getByRole('button', { name: 'Back to Home' })` | Returns to profile |

---

## Page Flow

```
/login → /profile → /appointments → /appointments/date → /appointments/details → /appointments/confirmation
```

---

## Additional Notes

1. **Dynamic Elements**:
   - Confirmation code is unique per booking
   - Available dates change based on current date (past dates disabled)
   - Available time slots may vary by tailor and date

2. **Wait Conditions**:
   - After login: Wait for profile page to load
   - After confirming: Wait for "Confirming..." to change to "Appointment Confirmed"

3. **Potential Edge Cases to Consider**:
   - Booking when no time slots are available
   - Booking with maximum items (10 for Men's Alterations)
   - Booking with minimum items (1)
   - Invalid login credentials
   - Session timeout during booking flow

4. **Validation Messages Observed**:
   - Login success toast: "Login successful!"

5. **Service Duration Calculations**:
   - Men's Alterations: 15 min/piece, Max 10 items
   - Women's Alterations: 20 min/piece, Max 10 items
   - Special Occasion Fitting: 30 min/piece, Max 2 items
   - 1st-Bridal Fitting: 90 min/piece, Max 4 items
   - 2nd-Bridal Fitting: 60 min/piece, Max 1 item

---

## Post-conditions
1. Appointment is successfully created in the system
2. User receives a confirmation code
3. Appointment appears in user's "My Appointments" list
4. User can add appointment to calendar

---

## Assertions for Automated Testing

```javascript
// Key assertions to include in automated test:
await expect(page).toHaveURL(/\/appointments\/confirmation/);
await expect(page.getByRole('heading', { name: 'Appointment Confirmed!' })).toBeVisible();
await expect(page.getByText('Your appointment for Men\'s Alterations has been successfully booked.')).toBeVisible();
await expect(page.getByText('Confirmation Code')).toBeVisible();
// Verify confirmation code format (6 alphanumeric characters)
await expect(page.locator('[data-testid="confirmation-code"]')).toHaveText(/^[A-Z0-9]{6}$/);
```
