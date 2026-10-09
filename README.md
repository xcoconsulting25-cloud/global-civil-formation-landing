# Global Civil — Formation Robot Structural Analysis

Site de vente pour les formations en ligne "Robot Structural Analysis"
proposées par Global Civil :
- `index.html` — formation complète (début : 10 octobre 2026)
- `session-speciale.html` — session spéciale, 8 cas avancés (du 2 au 7 novembre 2026)

Site statique, autonome (HTML + CSS + JS vanilla), sans framework ni étape de
build. Prêt à être déployé tel quel sur Vercel, Netlify, GitHub Pages ou tout
hébergement statique.

## Structure du projet

```
.
├── index.html            # Formation du 10 octobre (hero, programme, formateur, FAQ, CTA final)
├── session-speciale.html # Session spéciale novembre (8 cas avancés, 20 000 FCFA pour tous)
├── public/
│   ├── styles.css           # Feuille de style partagée par les deux pages
│   ├── site.js               # Scripts partagés (header, nav mobile, FAQ, compte à rebours)
│   ├── logo-global-civil.jpg
│   ├── instructor-photo.jpg
│   └── hero-structure-demo.mp4
├── tools/          # Script utilisé une fois pour extraire les médias
│   ├── source.html       # Version d'origine avec médias en base64 inline
│   └── extract-media.js  # Script d'extraction (Node.js, sans dépendance)
├── vercel.json     # Builds statiques (les deux pages HTML + /public) et cache long terme
└── .vercelignore   # Exclut tools/ du déploiement (non nécessaire en prod)
```

Les deux pages partagent `public/styles.css` et `public/site.js` : le design,
les composants (header, FAQ, compte à rebours, footer, icônes réseaux) et les
scripts ne sont pas dupliqués. Chaque page ne garde que son propre contenu et
sa navigation marquée comme page active.

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

## Liens externes utilisés par les pages

- Paiement formation (réservation) : `global-civil.mymaketou.shop/products/coaching-prive-4/checkout`
- Paiement formation (solde total) : `globalcivilstore.com/prd_nagyykt5/checkout`
- Paiement session spéciale : `globalcivilstore.com/prd_mc7c0bef/checkout` (20 000 FCFA, tarif unique pour tous)
- Vidéo de démonstration : YouTube (`youtube-nocookie.com`)
- WhatsApp : `wa.me/237673680032`
- Email : `contact.globalcivil@gmail.com`
