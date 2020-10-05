## Hello World Chat

La solution s'exécute directement en ouvrant la page HTML dans un navigateur. Il n'y a ni compilation, ni serveur Node. C'est pour ça que je n'ai pas pu utiliser des modules JavaScript, tout le code est chargé par le fichier HTML. J'utilise la bibliothèque RxJS.

Il y a trois composants :
1. Le `Store` qui reçoit, centralise et expose les messages de tout les chats au travers d'un `Observable`.
2. Les instances de `Chat` qui représente une fenêtre de chat avec des messages reçus et la capacité d'en écrire un. Les messages des autres utilisateurs sont reçus en s'abonnant au store.
3. Le `Presenter` qui fait tout le rendu HTML : affichage des messages reçus et envoyés, gestion du clic, etc.

A noter :
- On peut créer autant d'instances Chat que l'on veut depuis la fonction principale dans "hello-world-chat.html" : `let nbChats = 2;`.

- Il y a une simulation d'une latence réseau dans le store, c'est-à-dire que les messages envoyés ne sont pas immédiatement reçus.

- Le DOM utilise des `<template>`. C'est en quelque sorte l'ancêtre des Web Components, une portion de HTML que l'on charge, clone, et réutilise plusieurs fois sur la page.
