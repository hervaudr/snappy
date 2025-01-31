Arbo

snappy/
src/
├── app/
│   ├── (auth)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx               # Vue principale du dashboard
│   │   │   ├── loading.tsx            # État de chargement
│   │   │   └── error.tsx              # Gestion des erreurs
│   │   ├── schedule/
│   │   │   ├── page.tsx               # Vue du planning
│   │   │   ├── [week]/                # Planning par semaine
│   │   │   │   └── page.tsx
│   │   │   └── employee/[id]/         # Planning par employé
│   │   │       └── page.tsx
│   │   └── team/
│   │       ├── page.tsx               # Liste des employés
│   │       ├── add/                   # Ajout d'employé
│   │       │   └── page.tsx
│   │       └── [id]/                  # Détails employé
│   │           └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/                 # Endpoint connexion
│   │   │   │   └── route.ts
│   │   │   └── logout/                # Endpoint déconnexion
│   │   │       └── route.ts
│   │   ├── schedule/
│   │   │   ├── route.ts              # CRUD planning
│   │   │   └── [employeeId]/
│   │   │       └── route.ts          # Planning par employé
│   │   └── team/
│   │       ├── route.ts              # CRUD équipe
│   │       └── [id]/
│   │           └── route.ts          # Actions par employé
│
├── components/
│   ├── ui/                           # Composants shadcn
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── schedule/
│   │   ├── ScheduleGrid.tsx          # Grille du planning
│   │   ├── ShiftCard.tsx             # Carte de shift
│   │   ├── WeekPicker.tsx            # Sélecteur de semaine
│   │   └── ShiftForm.tsx             # Formulaire de shift
│   │
│   ├── team/
│   │   ├── EmployeeList.tsx          # Liste des employés
│   │   ├── EmployeeCard.tsx          # Carte employé
│   │   ├── EmployeeForm.tsx          # Formulaire employé
│   │   └── AvailabilityCalendar.tsx  # Calendrier disponibilités
│   │
│   └── layout/
│       ├── Header.tsx                # En-tête application
│       ├── Sidebar.tsx               # Barre latérale
│       └── Navigation.tsx            # Navigation principale
│
├── lib/
│   ├── auth/
│   │   ├── session.ts                # Gestion session
│   │   └── permissions.ts            # Gestion droits
│   │
│   ├── db/
│   │   ├── schema.ts                # Schéma base de données
│   │   └── queries/                 # Requêtes type
│   │       ├── schedule.ts
│   │       └── team.ts
│   │
│   ├── utils/
│   │   ├── dates.ts                 # Utilitaires dates
│   │   ├── validation.ts            # Validations
│   │   └── notifications.ts         # Gestion notifications
│   ├── types/             # Types TypeScript
│   │   ├── auth.ts
│   │   ├── schedule.ts
│   │   └── team.ts
│   ├── hooks/             # Custom hooks React
│   │   ├── useAuth.ts
│   │   └── useSchedule.ts
│   └── middleware.ts      # Middleware Next.js (auth, etc.)
├── prisma/               # Si utilisation de Prisma
│   └── schema.prisma    # Schéma de base de données
├── .gitignore
├── package.json
└── README.md


Peux tu me générer la script pour initialisé la bdd et/ou le schema de bdd? 

Je te remet les contraintes ici : 
- J'ai un ou plusieurs magasin qui peuvent avoir une seule équipe.
- Un magasin possède une ou plusieurs cabines. 
- Les membres de l'équipe peuvent avoir le rôle de "employé" ou "manager". D'autres rôles pourront être créés par la suite.
- Une équipe contient au moins un manager et un ou plusieurs employés.
- La manager peut ajouter/modifier/supprimer un employé.
- La manager crée le planning à la semaine pour chaque membre de son équipe sur plusieurs semaines. 
- La manager va devoir saisir les heures (début et fin) du matin et de l'après-midi pour chaque jour pour chaque employé. Il pourra préciser si il l'employé est en cabine ou non et dans laquelle. 
- Sur un journée la manager peut préciser que l'employé est à l'école. Ce qui définit un nombre d'heure par défaut sur la journée. 
- Un employé peut être absence sur une journée ce qui fait que le nombre d'heures à zéro sur la journée en question.
- Pour un membre ont a les infos suivante : prénom, nom, login, mot de passe, type de contrat, nb d'heure pour une journée d'école, nb d'heure pour une semaine.