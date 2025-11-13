# Birqadam - Fitness & Wellness Platform 

A comprehensive web-based fitness platform inspired by 1fit, offering personalized workout schedules, fitness programs, and membership management. Built with pure HTML, CSS, and JavaScript.

##  Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Pages Overview](#pages-overview)
- [Team](#team)

##  About

Birqadam is a modern fitness platform that provides users with access to various fitness programs, personalized schedules, and membership options. The platform features multiple user profiles (Aisha, Alina, Aliya, Karima) and includes fitness tracking, workout schedules, and membership management.

##  Features

- **User Profiles**: Multiple user profiles with personalized content
  - Aisha - About & FAQ sections
  - Alina - Fitness programs and home page
  - Aliya - Login system and profile management
  - Karima - Membership management and workout schedules

- **Membership System**: 
  - Buy membership functionality
  - Membership tiers and pricing

- **Workout Schedules**: 
  - Personalized fitness schedules
  - Program tracking and progress monitoring

- **Interactive UI**:
  - Theme toggle (dark/light mode) with custom icons
  - Keyboard navigation support with shortcuts
  - Multi-language support
  - Authentication system
  - Progress tracking with animated counters
  - Search and filter functionality
  - Copy to clipboard features
  - Motivational quote generator
  - Loading spinners and animations
  - Audio feedback and sound effects
  - Reset functionality for forms

##  Project Structure

```
assignment5678_web1/
├── pages/
│   ├── aisha-about.html          # About page
│   ├── aisha-faq.html             # FAQ section
│   ├── alina-fitness.html         # Fitness programs
│   ├── aliya-login.html           # Login page
│   ├── aliya-profile-guest.html   # Guest profile view
│   ├── aliya-profile.html         # User profile
│   ├── buymembership.html         # Membership purchase
│   ├── karima-membership.html     # Membership management
│   ├── karima-schedule.html       # Workout schedules
│   └── register.html              # User registration
├── scripts/
│   ├── asik5/
│   │   ├── task1.js               # Basic DOM manipulation
│   │   ├── task4.js               # Form validation
│   │   ├── task5.js               # Dynamic content loading
│   │   └── tasks2n3.js            # Event handling & interactions
│   ├── asik6/
│   │   ├── keyboard_n_multi.js    # Keyboard shortcuts & multilingual
│   │   ├── quote-but.js           # Quote generator
│   │   ├── reset_button.js        # Reset functionality
│   │   ├── sound.js               # Audio controls
│   │   ├── task6.js               # Advanced features
│   │   └── theme-toggle.js        # Dark/light mode switching
│   ├── asik7/
│   │   ├── animated_nums.js       # Number animations & counters
│   │   ├── loading_spinner.js     # Loading states & spinners
│   │   ├── progress.js            # Progress tracking
│   │   ├── search-t123.js         # Search functionality
│   │   ├── task7and9.js           # Complex interactions
│   │   └── task8-copy-clipboard.js # Clipboard operations
│   ├── asik8/                     # Additional advanced modules
│   └── final/
│   │  ├── program-modal.js       # Modal windows for programs
│   │  ├── rating.js             # Rating site
│   │  ├── recipe-api.js        # Recipe API
│   ├── nav_buttons.js         # Navigation system
├── sounds/
│   ├── notification.mp3   # UI sound effects   
├── images/
│   ├── backgrounds/               # Background images for different sections
│   │   ├── bg-dance.webp          # Dance program background
│   │   ├── bg-gym.webp            # Gym background
│   │   ├── bg-yoga.jpeg           # Yoga background
│   │   ├── bg-water.webp          # Water activities background
│   │   └── ...                    # Other activity backgrounds
│   ├── icons/                     # UI icons
│   │   ├── icon-community.png     # Community icon
│   │   ├── icon-trainer.png       # Trainer icon
│   │   ├── icon-plan.png          # Plan icon
│   │   ├── calendar.png           # Calendar icons
│   │   └── social media icons     # Instagram, Telegram, TikTok, WhatsApp
│   ├── logo.png                   # Main logo
│   ├── logo-2.png                 # Alternative logo
│   ├── profile-photo.webp         # Default profile photo
│   └── membership plans           # 90.png, 180.png, 365.png
├── styles/
│   ├── aisha.css                  # Aisha's section styles
│   ├── aisha0.css                 # Additional Aisha styles
│   ├── aliya-guest.css            # Guest profile styles
│   ├── aliya.css                  # Aliya's section styles
│   ├── aliya2.css                 # Additional Aliya styles
│   ├── fit-programs.css           # Fitness programs styles
│   ├── home.css                   # Homepage styles
│   ├── karima-membership.css      # Membership styles
│   ├── karima-schedule.css        # Schedule styles
│   ├── register.css               # Registration page styles
│   └── shared.css                 # Shared/global styles
├── index.html                     # Main landing page
└── README.md
```

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alinaa111/assignment5678_web1.git
   cd assignment5678_web1
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Run with Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   
   OR

4. **Open directly in browser**
   - Navigate to the project folder
   - Open `index.html` in your preferred browser

##  Usage

### Starting the Application

1. Open `index.html` to start at the main landing page
2. Navigate to `pages/aliya-login.html` for the login page
3. Or open any other page directly from the `pages/` folder

### Navigation

- Use the navigation buttons to switch between sections
- Press the theme toggle button (🌙) to switch between dark/light modes
- Use keyboard shortcuts for enhanced navigation (see keyboard_n_multi.js)

### User Flows

**For New Users:**
1. Start at `register.html`
2. Create an account
3. Login via `aliya-login.html`
4. Explore fitness programs
5. Purchase membership

**For Existing Users:**
1. Login via `aliya-login.html`
2. View profile at `aliya-profile.html`
3. Check schedule at `karima-schedule.html`
4. Manage membership at `karima-membership.html`

##  Pages Overview

| Page | Purpose | Features |
|------|---------|----------|
| `aisha-about.html` | About section | Company information, mission |
| `aisha-faq.html` | FAQ | Common questions and answers |
| `alina-fitness.html` | Fitness programs | Available workout programs |
| `aliya-login.html` | Authentication | User login system |
| `aliya-profile.html` | User profile | Personal information, stats |
| `aliya-profile-guest.html` | Guest view | Limited profile access |
| `buymembership.html` | Purchase | Membership plans and checkout |
| `karima-membership.html` | Membership mgmt | Active membership details |
| `karima-schedule.html` | Schedules | Personal workout calendar |
| `register.html` | Registration | New user signup |

##  Team

This project was developed by:

- **Alina Moldabayeva** - [@Alinaa111](https://github.com/Alinaa111)
- **Karima Shurenova**
- **Aliya Sadvokassova**
- **Aisha Yerbolat**

##  Key Scripts

### Asik5 - Core Functionality
- `task1.js` - Basic DOM manipulation and element interactions
- `task4.js` - Form validation and input handling
- `task5.js` - Dynamic content loading
- `tasks2n3.js` - Event handling and user interactions

### Asik6 - Enhanced Features
- `keyboard_n_multi.js` - Keyboard shortcuts and multilingual support
- `quote-but.js` - Motivational quote generator
- `reset_button.js` - Reset forms and clear data
- `sound.js` - Audio controls and sound effects
- `task6.js` - Advanced user interactions
- `theme-toggle.js` - Dark/light mode switching

### Asik7 - Advanced Features
- `animated_nums.js` - Animated number counters and statistics
- `loading_spinner.js` - Loading states and spinner animations
- `progress.js` - Progress tracking and visualization
- `search-t123.js` - Search and filter functionality
- `task7and9.js` - Complex UI interactions
- `task8-copy-clipboard.js` - Copy to clipboard functionality

### Final - Production Features
- `program-modal.js` - Modal windows for fitness programs
- `nav_buttons.js` - Main navigation system
- `notification.mp3` - UI sound effects and notifications

##  Styling Features

- **Shared Styles** (`shared.css`): Global styles, variables, and common components
- **Page-specific Styles**: Unique styling for each section
- **Rich Visual Assets**:
  - Custom backgrounds for each fitness program (yoga, dance, gym, martial arts, etc.)
  - Social media icons (Instagram, Telegram, TikTok, WhatsApp)
  - Calendar and plan icons with dark mode variants
  - Membership plan visuals (90-day, 180-day, 365-day)
  - Community and trainer icons
  - Professional logo designs
- Responsive layouts for mobile, tablet, and desktop
- Smooth transitions and animations
- Custom color schemes for each section
- Dark/light theme support with icon variants
- Modern UI/UX design patterns

##  Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

##  Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

##  Future Enhancements

- Backend integration
- Payment gateway integration
- Real-time workout tracking
- Social features
- Mobile app version

##  License

This project is part of an academic assignment.

---

**Repository**: [assignment5678_web1](https://github.com/Alinaa111/assignment5678_web1)

Made with ❤️ by Team Birqadam