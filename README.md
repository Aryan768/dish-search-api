# Restaurant Dish Search API

This is a backend service built using Node.js, Express, and TypeORM. It provides a single API endpoint to search for the top 10 restaurants that serve a specific dish within a mandatory price range, ordered by the total number of times that dish has been ordered.

## 🚀 Project Overview

The service addresses the core requirement of finding popular dishes based on search criteria.

### Data Model (Entities)

The database schema is designed with three main entities:

1.  **Restaurant:** Stores restaurant details (ID, Name, City).
2.  **MenuItem:** Stores individual dish items, linked to a Restaurant (ID, Dish Name, Price, Restaurant ID).
3.  **Order:** Represents a single instance of a dish being ordered, linked to a MenuItem (ID, MenuItem ID).

The search query leverages `JOIN` and `GROUP BY` clauses to aggregate order counts and apply filters efficiently.

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Web Framework:** Express.js
- **ORM:** TypeORM
- **Database:** PostgreSQL (Hosted on Supabase)

## ⚙️ Setup and Installation

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v18+)
- npm (or yarn)
- A PostgreSQL database instance (We are using Supabase)

# ----------------------------------------------------------------------

# Database Configuration for Deployment/Remote Connection (REQUIRED)

# ----------------------------------------------------------------------

# NOTE: Replace [YOUR_PASSWORD] with your actual, secure database password.

# The URL should include any necessary URL encoding (e.g., # becomes %23).

DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_SUPABASE_HOST].supabase.co:5432/postgres"

# ----------------------------------------------------------------------

# Application Configuration

# ----------------------------------------------------------------------

# Port where the Express server will listen

PORT=3000

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd dish-search-api
```
