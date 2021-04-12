import { functionsEnabled } from '../../utils/interfaces';
export default (req: any, res: { statusCode: number; json: (arg0: Array<functionsEnabled>) => void }) => {
    res.statusCode = 200
    res.json([
        {
            name: "Twitch Tools",
            href: "/twitchTools",
            description: `
- Connexion à **Twitch**
- Récupération des infos de la chaîne
- Création de robot pour le **chat** et **OBS** (outils de modération, points de chaînes...)
- Page de **chat** connectée au **robot**
- Calque navigateur pour les **alertes** (nouveau sub, event...)    
        `},
        {
            name: "Instauto",
            href: "/instauto",
            description: `
Publiez des photos aléatoirement sur **Instagram**
        `}
        
    ])
  }  