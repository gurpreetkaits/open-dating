# Frontend Architecture - Open Dating

## 📁 Folder Structure

```
src/
├── assets/                    # Static assets
│   ├── images/               # Image files
│   ├── icons/                # Icon files  
│   └── styles/               # Global styles
├── components/               # Vue components
│   ├── features/            # Feature-specific components
│   │   ├── auth/            # Authentication components
│   │   ├── profile/         # Profile management
│   │   ├── matching/        # Matching/discovery
│   │   ├── chat/            # Chat/messaging
│   │   └── preferences/     # User preferences
│   ├── layout/              # Layout components
│   │   ├── AppNavigation.vue
│   │   └── MobileNavigation.vue
│   └── ui/                  # Reusable UI components
│       ├── buttons/         # Button components
│       ├── cards/           # Card components
│       ├── forms/           # Form components
│       ├── modals/          # Modal components
│       └── navigation/      # Navigation components
├── composables/             # Vue composables (reusable logic)
├── constants/               # App constants
├── layouts/                 # Page layouts
├── router/                  # Vue Router configuration
├── services/                # API services
├── stores/                  # Pinia stores
├── types/                   # Type definitions
├── utils/                   # Utility functions
├── views/                   # Page components
├── App.vue                  # Root component
└── main.js                  # App entry point
```

## 🏗️ Architecture Principles

### 1. Feature-Based Organization
Components are organized by features (auth, profile, matching, chat) rather than by type. This makes it easier to locate and maintain related functionality.

### 2. Separation of Concerns
- **Views**: Page-level components that use layouts
- **Layouts**: Reusable page structures
- **Components**: Reusable UI components organized by feature or type
- **Services**: API communication layer
- **Stores**: State management
- **Utils**: Pure utility functions
- **Composables**: Reusable reactive logic

### 3. Design System Approach
UI components are atomic and reusable:
- **Buttons**: Various button styles and states
- **Forms**: Input fields, validation
- **Cards**: Content containers
- **Navigation**: Navigation elements

## 📋 Component Guidelines

### UI Components (`src/components/ui/`)
Reusable, generic components that don't contain business logic:
- Should accept props for customization
- Should emit events for interactions
- Should be documented with prop types
- Should follow consistent naming conventions

```vue
<!-- Example: PrimaryButton.vue -->
<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <slot />
  </button>
</template>
```

### Feature Components (`src/components/features/`)
Domain-specific components that contain business logic:
- Can use UI components
- Can access stores and services
- Should be organized by feature domain

```vue
<!-- Example: AuthForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <FormInput v-model="email" type="email" />
    <PrimaryButton type="submit">Login</PrimaryButton>
  </form>
</template>
```

## 🔧 Services Pattern

Services handle all API communication following the pattern:
**Frontend → Store → Service → API**

```javascript
// authService.js
class AuthService {
  async login(credentials) {
    return await ApiService.post('/auth/login', credentials)
  }
}
```

## 🗃️ Store Organization

Stores are organized by domain and follow consistent patterns:

```javascript
// stores/auth.js
export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, isLoading: false }),
  actions: {
    async login(credentials) {
      this.isLoading = true
      // Use service for API calls
      const response = await authService.login(credentials)
      this.user = response.user
      this.isLoading = false
    }
  }
})
```

## 🎣 Composables Usage

Composables encapsulate reusable reactive logic:

```javascript
// composables/useBreakpoint.js
export function useBreakpoint() {
  const windowWidth = ref(window.innerWidth)
  const isMobile = computed(() => windowWidth.value < 768)
  
  return { windowWidth, isMobile }
}
```

## 🎨 Styling Approach

### Tailwind CSS
Primary styling method using utility classes:
- Consistent design tokens
- Responsive design
- Dark mode ready
- Custom color palette for dating theme

### Component Styles
Scoped styles for component-specific needs:
```vue
<style scoped>
.custom-animation {
  transition: all 0.3s ease;
}
</style>
```

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🚀 Performance Considerations

### Code Splitting
- Route-based splitting
- Feature-based dynamic imports
- Lazy loading for non-critical components

### Optimization
- Image optimization
- Bundle size monitoring
- Tree shaking
- Component lazy loading

## 🧪 Testing Strategy

### Component Testing
- Unit tests for utilities
- Component tests for UI components
- Integration tests for features

### Testing Structure
```
tests/
├── unit/
├── components/
└── integration/
```

## 📚 Development Guidelines

### Naming Conventions
- Components: PascalCase (`AuthForm.vue`)
- Files: camelCase (`authService.js`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### Import Organization
```javascript
// Vue imports
import { ref, computed } from 'vue'

// External libraries
import { useRouter } from 'vue-router'

// Internal utilities
import { validateEmail } from '../utils/validation.js'

// Components
import PrimaryButton from '../components/ui/buttons/PrimaryButton.vue'
```

### Code Quality
- Use meaningful variable names
- Avoid unnecessary comments
- Follow Vue 3 Composition API patterns
- Use TypeScript-style prop definitions

## 🔄 Migration Path

When adding new features:
1. Create feature folder in `components/features/`
2. Add corresponding service in `services/`
3. Create store if needed in `stores/`
4. Add routes in `router/`
5. Update constants if needed

This architecture supports the growth of Open Dating from a simple app to a complex platform while maintaining code quality and developer experience. 