# Pandemic

# How to run?
Visit https://kentgrigo.github.io/Pandemic

or open `/index.html`.


# What is this?
This is my implementation of the board game Pandemic.

The goal of Pandemic is to find a cure for all four of the raging viruses, while keeping the level of infections down to avoid outbreaks.

Each round, one player has four actions to
- Move or fly between cities
- Share city cards with other team members
- Build a research station
- Make a cure based on city cards

After a round, cities are infected based on the infection deck.
You draw cards based on the infection rate.
Then you draw two player cards.
Player cards consist of city cards, event cards, and epidemic cards.
To make a cure, you need five city cards of the specific color.
Event cards can help you do different things that will help you save the world.
When you draw an epidemic card, a new city is infected, drawn from the bottom of the infection deck.
The infection rate increases, and the discarded infection cards are shuffled and put on top of the infection deck.

Your team consist of different roles:
- Medic (quick disinfections)
- Dispatcher (move and fly others)
- Contingency Planner (reuse event cards)
- Operations Expert (build and move anywhere from research centers)
- Quarantine Specialist (block infections locally)
- Researcher (share city cards)
- Scientist (make a cure with four city cards)
