# Stop Smoking Buddy 🚭

A comprehensive web application designed to help users quit smoking through personalized tracking, motivation, and support features. Built with Next.js 15, TypeScript, and modern React patterns.

## 🌟 Features

### 🏠 **Dashboard & Progress Tracking**

- **Personalized Dashboard**: View your quit date, reason for quitting, and progress metrics
- **Health Metrics**: Track improvements in health indicators over time
- **Goal Management**: Set and track personal milestones and achievements
- **Progress Visualization**: See your journey with detailed progress reports

### 🎯 **Goal Setting & Management**

- **Custom Goals**: Create personalized smoking cessation goals
- **Interactive Goal Tracking**: Mark goals as complete and track progress
- **Milestone Celebrations**: Visual feedback for achieved milestones

### 😤 **Cravings Management**

- **Craving Tracking**: Log cravings with detailed context (feelings, activities, company)
- **Pattern Analysis**: Identify triggers and patterns in your cravings
- **Coping Strategies**: Get personalized recommendations for managing cravings

### 📖 **Personal Diary**

- **Daily Journaling**: Record your thoughts, feelings, and experiences
- **Progress Reflection**: Track your emotional and physical journey
- **Historical Records**: Review past entries to see your growth

### 💬 **AI-Powered Chat Support**

- **24/7 Support**: Chat with an AI assistant for motivation and advice
- **Personalized Responses**: Get tailored support based on your profile and progress
- **Real-time Streaming**: Interactive chat experience with streaming responses

### 🔐 **Authentication & Security**

- **Auth0 Integration**: Secure user authentication and authorization
- **Protected Routes**: All user data is protected behind authentication
- **Session Management**: Secure session handling with automatic token refresh

## 🏗️ Architecture Overview

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  Next.js Frontend (React 19 + TypeScript)                  │
│  ├── Auth0 Authentication                                   │
│  ├── State Management (Zustand)                            │
│  ├── UI Components (Radix UI + Tailwind)                   │
│  └── Feature Modules                                        │
│      ├── Dashboard                                          │
│      ├── Cravings Tracker                                  │
│      ├── Diary System                                      │
│      ├── Chat Interface                                    │
│      └── Goals Management                                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    API LAYER                                │
├─────────────────────────────────────────────────────────────┤
│  Next.js API Routes                                         │
│  ├── Auth0 Middleware                                       │
│  ├── Server-side Fetching                                   │
│  └── Route Handlers                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────┤
│  ├── Auth0 Identity Provider                                │
│  ├── Backend API Server                                     │
│  └── AI Chat Service                                        │
└─────────────────────────────────────────────────────────────┘
```

### **Project Structure**

```
stop_smoking_client/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth0 authentication
│   │   ├── chat/                 # Chat functionality
│   │   ├── cravings/             # Cravings management
│   │   ├── diary/                # Diary operations
│   │   ├── health/               # Health metrics
│   │   ├── motivation/           # Motivation content
│   │   └── preference/           # User preferences
│   ├── chat/                     # Chat page
│   ├── cravings/                 # Cravings page
│   ├── diary/                    # Diary page
│   ├── preferences/              # Preferences page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── elements/                 # Reusable UI elements
│   ├── modules/                  # Feature-specific components
│   │   ├── chat/                 # Chat components
│   │   ├── cravings/             # Cravings components
│   │   ├── diary/                # Diary components
│   │   ├── goals/                # Goals components
│   │   ├── health/               # Health components
│   │   ├── home/                 # Dashboard components
│   │   └── Navbar/               # Navigation
│   └── ui/                       # UI component library
├── lib/                          # Utility libraries
│   └── auth0.ts                  # Auth0 configuration
├── services/                     # API services
│   └── api/                      # API client and types
├── store/                        # State management
│   └── user-store/               # User state
├── utils/                        # Utility functions
│   └── constants/                # Application constants
├── middleware.ts                 # Next.js middleware
└── package.json                  # Dependencies
```

## 🛠️ Technology Stack

### **Frontend Framework**

- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development with strict type checking
- **React 19** - Latest React with concurrent features

### **Styling & UI**

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Component variant management

### **State Management**

- **Zustand** - Lightweight state management
- **React Hooks** - Local component state management

### **Authentication & Security**

- **Auth0** - Enterprise-grade identity and access management
- **Next.js Auth0 SDK** - Seamless Auth0 integration
- **Middleware Protection** - Route-level security

### **AI & Real-time Features**

- **AI SDK** - AI integration for chat functionality
- **Streaming Support** - Real-time chat responses
- **Tavily Search** - Web search integration

### **Development & Testing**

- **Jest** - Unit testing framework
- **Cypress** - End-to-end testing
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Auth0 account (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stop_smoking_client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Auth0 Configuration
   AUTH0_SECRET=your-auth0-secret
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
   AUTH0_CLIENT_ID=your-client-id
   AUTH0_CLIENT_SECRET=your-client-secret
   AUTH0_AUDIENCE=your-api-audience

   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=your-backend-api-url
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔄 Data Flow Architecture

### **Authentication Flow**

```
1. User Access Protected Route
   │
   ▼
2. Frontend → Middleware (with session)
   │
   ▼
3. Middleware → Auth0 (validate session)
   │
   ▼
4. Auth0 Response:
   ├── Session Valid → Continue to step 6
   └── Session Invalid → Redirect to login
       │
       ▼
5. Auth0 Login → Authentication Success
   │
   ▼
6. Middleware → Backend API (with token)
   │
   ▼
7. Backend API → Middleware (response)
   │
   ▼
8. Middleware → Frontend (response)
   │
   ▼
9. Frontend → User (render content)
```

### **Component Architecture**

```
App Layout
├── Navbar
│   ├── Logo
│   ├── Navigation Items
│   └── User Button
└── Page Content
    ├── Home Dashboard
    │   ├── Info Component
    │   ├── Goals List
    │   ├── Health Metrics
    │   └── Motivation Content
    ├── Cravings Page
    │   ├── Cravings Form
    │   └── Cravings History
    ├── Diary Page
    │   ├── Diary Form
    │   └── Diary Entries
    ├── Chat Page
    │   ├── Chat Interface
    │   └── Message History
    └── Preferences Page
        ├── Preferences Form
        └── Goal Management
```

## 📱 Application Structure

### **Pages & Routes**

| Route              | Component         | Purpose                               |
| ------------------ | ----------------- | ------------------------------------- |
| **`/`**            | `HomeContent`     | Main dashboard with progress overview |
| **`/cravings`**    | `CravingsContent` | Craving tracking and management       |
| **`/diary`**       | `DiaryContainer`  | Personal diary and journaling         |
| **`/chat`**        | `ChatPage`        | AI-powered chat support               |
| **`/preferences`** | `PreferencesForm` | User settings and configuration       |

### **API Routes Structure**

| Endpoint                            | Method       | Purpose                       |
| ----------------------------------- | ------------ | ----------------------------- |
| **`/api/auth/[...auth0]`**          | GET/POST     | Auth0 authentication handlers |
| **`/api/chat/thread`**              | POST         | Create new chat thread        |
| **`/api/chat/threads/[id]/stream`** | POST         | Stream chat responses         |
| **`/api/cravings`**                 | GET/POST     | Manage craving entries        |
| **`/api/diary`**                    | GET/POST/PUT | Diary operations              |
| **`/api/health`**                   | GET          | Health metrics data           |
| **`/api/motivation/detailed-text`** | GET          | Motivation content            |
| **`/api/preference`**               | GET/POST     | User preferences              |

### **Key Components**

#### **Dashboard Components**

- **`HomeContent`**: Main dashboard container
- **`Info`**: User quit date and reason display
- **`GoalsListInteractive`**: Interactive goal management
- **`HealthMetricsList`**: Health progress visualization
- **`MotivationContent`**: Personalized motivation display

#### **Feature Components**

- **`PreferencesForm`**: Initial setup and user configuration
- **`CravingsContent`**: Craving tracking interface
- **`DiaryContainer`**: Diary management system
- **`ChatInterface`**: AI chat functionality
- **`GoalsModal`**: Goal creation and editing

#### **Shared Components**

- **`Navbar`**: Main navigation with authentication
- **`UserButton`**: User profile and logout
- **`PageLoading`**: Loading states
- **`ConfirmationDialog`**: Confirmation modals

## 🧪 Testing

### **Unit Tests**

```bash
npm test
```

### **Watch Mode**

```bash
npm run test:watch
```

### **E2E Tests**

```bash
# Open Cypress
npm run cypress:open

# Run headless
npm run cypress:run
```

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```


## 📊 Features Overview

### **User Onboarding**

1. **Authentication**: Secure login with Auth0
2. **Initial Setup**: Configure quit date, reason, and goals
3. **Language Selection**: Multi-language support (EN, PT-BR, ES, FR)

### **Daily Usage**

1. **Dashboard Check-in**: View progress and health metrics
2. **Craving Logging**: Track cravings with context
3. **Diary Entries**: Record thoughts and experiences
4. **Chat Support**: Get AI-powered motivation and advice

### **Progress Tracking**

- **Health Improvements**: Monitor physical health changes
- **Goal Achievement**: Track milestone completion
- **Pattern Recognition**: Identify triggers and success factors
- **Motivational Content**: Personalized encouragement and tips

## 🔧 Development Guidelines

### **Code Organization**

- **Feature-based Structure**: Components organized by feature modules
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Reusable Components**: Shared UI components in `/components/ui`

### **State Management Strategy**

```
State Management Layers:
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL STATE                              │
├─────────────────────────────────────────────────────────────┤
│  Component State (React Hooks)                             │
│  ├── Form State (controlled inputs)                        │
│  └── UI State (modals, loading, etc.)                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   GLOBAL STATE                             │
├─────────────────────────────────────────────────────────────┤
│  Zustand Store                                             │
│  ├── User Preferences                                      │
│  └── App Settings                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   SERVER STATE                             │
├─────────────────────────────────────────────────────────────┤
│  API Cache (Server-side fetching)                          │
│  ├── User Data                                             │
│  └── Health Metrics                                        │
└─────────────────────────────────────────────────────────────┘
```

### **API Integration Pattern**

```typescript
// Server-side data fetching
export async function HomeContent() {
  const [motivation, health, preferences] = await Promise.all([
    serverFetch<IMotivation>("/motivation/detailed-text"),
    serverFetch<IHealth>("/health"),
    serverFetch<IPreference>("/preference"),
  ]);

  return <HomeContentClient {...{ motivation, health, preferences }} />;
}

// Client-side API calls
const apiService = new ApiService();
const cravings = await apiService.getCravings();
```

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   ```bash
   git add .
   git commit -m 'Add amazing feature'
   ```
4. **Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### **Code Standards**

- **TypeScript**: All new code must be typed
- **ESLint**: Follow the configured linting rules
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes


## 🎯 Roadmap

### **Planned Features**

- [ ] **Social Features**: Community support and sharing
- [ ] **Gamification**: Achievement system and rewards
- [ ] **Multi-language**: Expand language support
- [ ] **Push Notifications**: Motivation and reminders

