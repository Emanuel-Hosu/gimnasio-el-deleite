# Gimnasio El Deleite · Web

Web multipágina del Gimnasio El Deleite (Aranjuez), hermana del portfolio de
Juanjo Villajos: mismo motor (HTML + CSS + GSAP ScrollTrigger) y misma familia
tipográfica (Anton + Archivo), pero en la paleta real del local: blanco, azul
Telju y azulejo crema.

## Páginas

- `index.html`: portada con hero de vídeo en duotono azul, manifiesto,
  presentación del gimnasio, banda de campeonatos, sección de Juanjo (enlaza a
  juanjovillajos.es), la cuota única (30 €/mes) y contacto.
- `gimnasio.html`: filosofía old school, mosaico de ocho zonas y opiniones.
- `campeonatos.html`: historia del Campeonato de Culturismo Villa de Aranjuez
  y del Grand Prix de Atletas de Fuerza + galería de diez fotos con lightbox
  (el "muro de campeones", con las fotos reales de las paredes del gimnasio).

## Decisiones de diseño

- **Menú**: no hay barra de enlaces. Arriba solo van la marca, el teléfono
  (acción directa, que es lo que busca quien entra) y un botón rotulado
  `Menú`. Al pulsarlo se abre un panel a pantalla completa a modo de cartel,
  con los enlaces en Anton y una foto del gimnasio en duotono al lado.
- **Duotono azul**: el vídeo del hero y la foto del menú van en escala de
  grises con una capa azul en `mix-blend-mode: color`. Así cualquier metraje
  de archivo (el original tenía paredes rojas) queda en la paleta de la casa.
- **Sin contadores ni cifras animadas**: en su lugar hay un manifiesto
  tipográfico. Los únicos números de la web son reales: la cuota, el teléfono
  y el horario.
- **Textura de cartel**: grano de papel impreso sobre toda la página, fotos
  ligeramente torcidas con marco blanco y palabras resaltadas a brocha azul.

## Cómo verla en local

```bash
python3 -m http.server 8741
```

y abrir <http://localhost:8741>.

## Contenido pendiente de sustituir (buscar `TODO` en el código)

1. **Vídeo del hero** (`assets/gym-hero.mp4` + `gym-hero-poster.jpg`): es
   metraje de archivo de una sala vacía. Sustituir por un vídeo grabado dentro
   del gimnasio; el duotono lo ajustará solo a la paleta.
2. **Fotos ilustrativas**: `sala-blanca.jpg`, `mancuernas.jpg`, `cardio.jpg`,
   `vestuarios.jpg`, `lift.jpg`, `chalk.jpg`, `seminarios.jpg` y
   `grandprix.jpg` son de archivo. Las reales del gimnasio son
   `sala-maquinas.jpg`, `muro-*.jpg` y `cartel-*.jpg`.
3. **Galería** (`campeonatos.html`): añadir más fotos del archivo del gimnasio
   copiando el patrón `<figure class="wall__item">`, y retirar la nota final
   cuando ya no queden fotos ilustrativas.
4. **Redes sociales**: no hay enlaces porque no tengo los perfiles; añadirlos
   en el footer si existen.

## Datos reales usados

- Dirección: Paseo del Deleite 1, 28300 Aranjuez.
- Teléfono: 619 88 81 22.
- Horario: L a V, de 9:00 a 13:30 y de 16:00 a 22:00 (fines de semana cerrado).
- Cuota única de 30 € al mes; primera sesión de prueba por 5 €.
- Valoración 4,8/5 en Google (las opiniones son paráfrasis de reseñas reales).
- AAFAF activa desde 1989; XXIII Campeonato de Culturismo (2024) y XX Grand
  Prix (2025).

## Créditos de material de archivo

Vídeo y fotografía ilustrativa: Pexels (licencia libre para uso comercial).
