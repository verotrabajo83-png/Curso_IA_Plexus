# Copilot Instructions

This repository contains a React + TypeScript + Vite app under `ice-task-manager/`.

## What to prioritize
- Work mainly inside `ice-task-manager/src/`, especially `components/`, `hooks/`, `services/`, `types/`, and `utils/`.
- Keep code concise, clean, and easy to read.
- Use strict TypeScript typing and avoid `any`.
- Prefer small, focused changes over broad refactors.
- Keep UI and business logic separated.
- Do not hardcode secrets, tokens, or API keys in source files.

## Style and behavior
- Write responses concisely.
- Do not explain intermediate steps unless the user asks explicitly.
- Focus on action and implementation, not narrative.
- Use existing project conventions and minimal additions.

## Project commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

## Important notes
- The app is a frontend MVP with React and TypeScript.
- The service layer should be isolated from presentation.
- Preserve existing architecture and folder structure.
- Keep validation and business rules in hooks/services, not in components.
