-- NutriAI Database Schema
-- PostgreSQL 16+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- User profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    age INTEGER,
    gender VARCHAR(20),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    tmb INTEGER, -- Tasa Metabólica Basal
    neat VARCHAR(50), -- Nivel de actividad (sedentary, light, moderate, very_active, extreme)
    allergies TEXT[], -- Array de alergias
    intolerances TEXT[], -- Array de intolerancias
    budget VARCHAR(50), -- low, medium, high
    somatotype VARCHAR(50), -- ectomorph, mesomorph, endomorph
    goal VARCHAR(50), -- fat_loss, muscle_gain, recomp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user ON user_profiles(user_id);

-- Body measurements (tracking antropométrico)
CREATE TABLE body_measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg DECIMAL(5,2),
    neck_cm DECIMAL(5,2),
    chest_cm DECIMAL(5,2),
    waist_cm DECIMAL(5,2),
    hip_cm DECIMAL(5,2),
    arm_cm DECIMAL(5,2),
    thigh_cm DECIMAL(5,2),
    body_fat_estimate DECIMAL(4,2), -- Porcentaje estimado por CV
    photos JSONB, -- {"front": "url", "side": "url", "back": "url"}
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_measurements_user_date ON body_measurements(user_id, date DESC);

-- Nutrition plans
CREATE TABLE nutrition_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    goal_type VARCHAR(50), -- fat_loss, muscle_gain, maintenance
    daily_calories INTEGER NOT NULL,
    protein_g INTEGER NOT NULL,
    carbs_g INTEGER NOT NULL,
    fat_g INTEGER NOT NULL,
    plan_json JSONB NOT NULL, -- Plan completo generado por IA
    status VARCHAR(50) DEFAULT 'active', -- active, completed, cancelled
    ai_model VARCHAR(100), -- Modelo de IA usado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_nutrition_user_status ON nutrition_plans(user_id, status);

-- Progress logs (registro diario opcional)
CREATE TABLE progress_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg DECIMAL(5,2),
    measurements_id UUID REFERENCES body_measurements(id),
    mood VARCHAR(50), -- great, good, neutral, bad, terrible
    energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_user_date ON progress_logs(user_id, date DESC);

-- Vision analysis results (Computer Vision cache)
CREATE TABLE vision_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    measurement_id UUID REFERENCES body_measurements(id),
    photo_url TEXT NOT NULL,
    analysis_result JSONB NOT NULL, -- Resultado completo del análisis
    body_fat_estimate DECIMAL(4,2),
    somatotype_detected VARCHAR(50),
    ai_model VARCHAR(100),
    confidence_score DECIMAL(3,2), -- 0.00 - 1.00
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vision_user ON vision_analyses(user_id);

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON nutrition_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
