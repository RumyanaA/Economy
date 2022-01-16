# Economy
Simulator for economy and population development.

## Defininition of entities:
* Pop
* Factory
* Market

## Entity description:
### Pop:
A Pop defines a single person in the nation.
Pop can perform 2 operations:
* Work (in factory)
* Fulfill needs(basic, like food and clothes)
* Leave Factory
* Start working in another Factory
Population key properties:
* Happiness:
* -Happiness is in range between 0 and 100;
* -range 60-100 no chance to leave current factory. //in future: possibility to promote to higher class of society
* -range 30-60 means normal - no negative or positive effects
* -range 1-30 decrease in productivity (defined in productivity section)
* -0 happiness means the pop dies;
### Productivity(related to happiness)