# Mini SaaS

Ce repository contient le code source pour la création d'un SaaS avec les technologies suivantes :
- Next.js
- Clerk
- Prisma
- SQLite
- Tailwind CSS

## Prérequis

- Node.js et npm installés

## Installation

1. Clonez ce repository :
    ```bash
    git clone https://github.com/laminutedecode/Mini-SaaS-Next-JS-Clerk-Prisma-Youtube
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```
3. Configurez les variables d'environnement. Créez un fichier `.env.local` et ajoutez les variables nécessaires :
    ```bash
        DATABASE_URL="URLDataBase"
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="ClerkKey"
        CLERK_SECRET_KEY="ClerkSecret"
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
        NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
    ```
4. Exécutez les migrations de Prisma pour configurer la base de données :
    ```bash
    npx prisma migrate dev --name init
    ```
5. Lancez l'application en mode développement :
    ```bash
    npm run dev
    ```

## Utilisation

Vous pouvez maintenant accéder à l'application SaaS à l'adresse `http://localhost:3000`. Utilisez les fonctionnalités d'authentification, de gestion des utilisateurs, et de traitement des paiements intégrées.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :
1. Forkez ce repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`).
3. Commitez vos modifications (`git commit -am 'Ajoutez ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est la propriété de LaMinuteDeCode. Il est strictement interdit de copier ou de vendre ces ressources sans autorisation préalable. Voir le fichier `LICENSE` pour plus de détails.
