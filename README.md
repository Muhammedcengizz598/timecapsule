# TimeCapsule

<div align="center">

![TimeCapsule Banner](https://img.shields.io/badge/TimeCapsule-Send%20Messages%20to%20Your%20Future-00ff41?style=for-the-badge)

[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.2-092E20?style=flat-square&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![License](https://img.shields.io/badge/License-MIT-00ff41?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Muhammedcengizz598/timecapsule?style=flat-square&color=00ff41)](https://github.com/Muhammedcengizz598/timecapsule/stargazers)

**A modern web application for creating time capsules with persistent browser notifications**

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [Technology](#technology) • [Contributing](#contributing)

</div>

---

## Overview

TimeCapsule is a cutting-edge web application that allows you to send messages, photos, audio, and videos to your future self. Built with Django and modern web technologies, it features a sleek black-green theme and uses Service Workers for persistent notifications that work even when your browser is closed.

### Key Highlights

- **Persistent Notifications**: Receive notifications even when browser is closed using Service Workers
- **Rich Media Support**: Add text, audio, images, and videos to your time capsules
- **Real-time Countdowns**: Live countdown timers for each capsule
- **Modern UI/UX**: Professional black-green theme with smooth animations
- **Secure & Private**: User authentication with encrypted data storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

---

## Features

### Core Functionality

- **Multi-Page Architecture**
  - Landing page with animated hero section
  - How It Works timeline guide
  - Notification permission setup
  - Dashboard for managing capsules

- **Time Capsule Management**
  - Create capsules with future delivery dates
  - Add multiple media types (audio, images, videos)
  - View all capsules with status indicators
  - Delete capsules with smooth animations
  - Real-time countdown timers

- **Notification System**
  - Browser notification permission handling
  - Service Worker for offline notifications
  - LocalStorage persistence across sessions
  - Automatic notification scheduling

- **User Experience**
  - Smooth page transitions
  - Animated scroll indicators
  - Hover effects and micro-interactions
  - Responsive mobile-first design
  - Loading states and feedback

### Design Features

- **Black-Green Theme**: Professional dark theme with vibrant green accents
- **Particle Effects**: Animated background particles on hero section
- **Glitch Effect**: Eye-catching title animation
- **Card Animations**: Smooth hover and transition effects
- **Timeline Layout**: Visual step-by-step guide
- **Modal System**: Elegant popups for authentication and capsule creation

---

## Demo

### Screenshots

**Home Page**
- Hero section with particle effects
- Feature cards highlighting benefits
- Call-to-action sections

**Dashboard**
- Grid layout of time capsules
- Status indicators (Sealed/Opened)
- Media badges for attached files
- Live countdown timers

**How It Works**
- Interactive timeline
- Visual step-by-step guide
- Technical explanations

---

## Installation

### Prerequisites

- Python 3.13 or higher
- pip package manager
- Modern web browser (Chrome, Firefox, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammedcengizz598/timecapsule.git
   cd timecapsule
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```

7. **Open your browser**
   ```
   Navigate to http://127.0.0.1:8000
   ```

---

## Usage

### Creating Your First Time Capsule

1. **Sign Up**: Create an account on the home page
2. **Enable Notifications**: Allow browser notifications when prompted
3. **Create Capsule**: Click "Create New Capsule" on the dashboard
4. **Add Content**: 
   - Write your message
   - Upload audio, images, or videos (optional)
   - Select future date and time
5. **Seal**: Submit to create your time capsule
6. **Wait**: Watch the countdown and wait for your notification

### Managing Capsules

- **View All**: Dashboard shows all your capsules in a grid
- **Check Status**: Sealed (active) or Opened (delivered)
- **See Countdown**: Real-time countdown for each capsule
- **Delete**: Remove capsules you no longer want

### Notification System

The app uses modern Web APIs for persistent notifications:

- **Service Workers**: Run in background even when browser is closed
- **Push API**: Schedule and deliver notifications
- **LocalStorage**: Maintain notification schedule across sessions
- **Notification API**: Display rich notifications with actions

---

## Technology Stack

### Backend
- **Django 5.2**: Web framework
- **Python 3.13**: Programming language
- **SQLite**: Database (development)
- **Pillow**: Image processing

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript ES6+**: Interactive functionality
- **Service Workers**: Background notifications
- **LocalStorage API**: Client-side persistence

### Design
- **Custom CSS**: No frameworks, pure CSS
- **Responsive Design**: Mobile-first approach
- **Animations**: CSS animations and transitions
- **Icons**: SVG icons for scalability

---

## Project Structure

```
timecapsule/
├── timecapsule/              # Django project settings
│   ├── settings.py          # Main configuration
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI config
│
├── timecapsule_app/         # Main application
│   ├── models.py            # Database models
│   ├── views.py             # View controllers
│   ├── admin.py             # Admin interface
│   └── management/          # Custom commands
│
├── templates/               # HTML templates
│   ├── base.html           # Base template
│   ├── home.html           # Landing page
│   ├── dashboard.html      # User dashboard
│   ├── how_it_works.html   # Guide page
│   └── notification.html   # Permission setup
│
├── static/                  # Static assets
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   └── js/
│       ├── main.js         # Core functionality
│       ├── dashboard.js    # Dashboard logic
│       ├── notification.js # Notification setup
│       └── sw.js          # Service Worker
│
├── media/                   # User uploads
│   ├── audio/
│   ├── images/
│   └── videos/
│
└── requirements.txt         # Python dependencies
```

---

## API Endpoints

### Authentication
- `POST /register/` - User registration
- `POST /login/` - User login
- `GET /logout/` - User logout

### Capsules
- `POST /create-capsule/` - Create new capsule
- `POST /delete-capsule/<id>/` - Delete capsule
- `GET /get-capsules/` - Get user's capsules

### Notifications
- `POST /save-token/` - Save notification token

---

## Configuration

### Settings

Edit `timecapsule/settings.py` for:

- **Database**: Change from SQLite to PostgreSQL/MySQL for production
- **Static Files**: Configure for production deployment
- **Media Files**: Set up cloud storage (AWS S3, etc.)
- **Security**: Update SECRET_KEY and ALLOWED_HOSTS

### Environment Variables

For production, use environment variables:

```python
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')
```

---

## Deployment

### Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SECRET_KEY='your-secret-key'
heroku config:set DEBUG=False

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate
```

### Docker

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow PEP 8 for Python code
- Use meaningful variable names
- Add comments for complex logic
- Write descriptive commit messages

---

## Roadmap

- [ ] Email notifications as backup
- [ ] Social sharing features
- [ ] Public time capsules
- [ ] Group capsules
- [ ] Mobile app (React Native)
- [ ] Multiple languages support
- [ ] Dark/Light theme toggle
- [ ] Export capsules as PDF
- [ ] Calendar view
- [ ] Capsule templates

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Muhammed Cengiz**

- GitHub: [@Muhammedcengizz598](https://github.com/Muhammedcengizz598)
- Project Link: [https://github.com/Muhammedcengizz598/timecapsule](https://github.com/Muhammedcengizz598/timecapsule)

---

## Acknowledgments

- Django community for excellent documentation
- Service Workers API for background notifications
- Modern CSS techniques for animations
- Open source community for inspiration

---

## Support

If you found this project helpful, please consider:

- Giving it a star on GitHub
- Sharing it with others
- Contributing to the codebase
- Reporting bugs and suggesting features

---

<div align="center">

**Made with dedication by Muhammed Cengiz**

[![GitHub](https://img.shields.io/badge/GitHub-Muhammedcengizz598-00ff41?style=flat-square&logo=github)](https://github.com/Muhammedcengizz598)

</div>
