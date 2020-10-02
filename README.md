La solution s'exécute directement en ouvrant la page HTML dans un navigateur. Il n'y a ni compilation, ni serveur Node. C'est pour ça que je n'ai pas pu utiliser des modules JavaScript, tout le code est chargé par le fichier HTML. J'utilise aussi RxJS.

Il y a trois composants :
- Le `Store` qui reçoit, centralise et expose les messages de tout les chats au travers d'un observable.
- Les instances de `Chat` qui représente une fenêtre de chat avec des messages reçus et la capacité d'en écrire un. Les messages des autres utilisateurs sont reçus en s'abonnant au Store.
- Le `Presenter` qui fait tout le rendu HTML : affichage des messages reçus et envoyés, gestion du clic, etc.

On peut créer autant d'instances Chat que l'on veut dans la fonction principale dans "hello-world-chat.html" : `let nbChats = 2;`.

Il y a une simulation d'une latence réseau dans le Store : les messages envoyés ne sont pas immédiatement reçus.

Le DOM utilise des `<template>`. C'est un peu l'ancêtre des Web Components, une portion de HTML que l'on charge, clone, et réutilise plusieurs fois sur la page.