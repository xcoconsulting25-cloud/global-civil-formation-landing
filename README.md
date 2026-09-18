# Global Civil — Formation Robot Structural Analysis

Landing page de vente pour la formation en ligne "Robot Structural Analysis"
proposée par Global Civil (début : 10 octobre 2026).

Site statique, autonome (HTML + CSS + JS vanilla), sans framework ni étape de
build. Prêt à être déployé tel quel sur Vercel, Netlify, GitHub Pages ou tout
hébergement statique.

## Structure du projet

```
.
├── index.html      # Page unique (hero, programme, formateur, FAQ, CTA final)
├── public/         # Médias servis par la page (images + vidéo)
│   ├── logo-global-civil.jpg
│   ├── instructor-photo.jpg
│   └── hero-structure-demo.mp4
├── tools/          # Script utilisé une fois pour extraire les médias
│   ├── source.html       # Version d'origine avec médias en base64 inline
│   └── extract-media.js  # Script d'extraction (Node.js, sans dépendance)
├── vercel.json     # En-têtes de cache long terme pour /public
└── .vercelignore   # Exclut tools/ du déploiement (non nécessaire en prod)
```

`tools/` est conservé pour la traçabilité (comment les médias ont été extraits
du fichier d'origine) mais n'est pas déployé — voir `.vercelignore`.

## Développement local

Aucune dépendance, aucun build. Servez le dossier avec n'importe quel serveur
statique, par exemple :

```bash
python3 -m http.server 4173
# puis ouvrez http://localhost:4173/index.html
```

## Déploiement

Le projet est un site 100 % statique : Vercel le détecte automatiquement
(aucune configuration de framework nécessaire). Un simple `vercel --prod` à la
racine suffit, ou un déploiement via l'intégration GitHub.

## Liens externes utilisés par la page

- Paiement (réservation) : `global-civil.mymaketou.shop/products/coaching-prive-4/checkout`
- Paiement (solde total) : `globalcivilstore.com/prd_nagyykt5/checkout`
- Vidéo de démonstration : YouTube (`youtube-nocookie.com`)
- WhatsApp : `wa.me/237673680032`
- Email : `contact.globalcivil@gmail.com`
