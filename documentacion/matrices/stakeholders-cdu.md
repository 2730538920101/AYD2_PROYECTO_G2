[REGRESAR](../../README.md)

# Stakeholders vs CDU

| Casos de Uso (CU) | Cliente | Asistente | Conductor | Administrador |
|-------------------|---------|-----------|-----------|---------------|
| CU 001            | X       |           |           |               |
| CU 002            |         |           | X         |               |
| CU 003            | X       |           |           |               |
| CU 004            | X       |           |           |               |
| CU 005            |         |           | X         |               |
| CU 006            |         |           | X         |               |
| CU 007            |         | X         |           |               |
| CU 008            |         | X         |           |               |
| CU 009            |         |           |           | X             |
| CU 010            |         |           |           | X             |
| CU 017            | X       |           |           |               |
| CU 018            | X       |           |           |               |
| CU 019            | X       |           |           |               |
| CU 020            | X       |           |           |               |
| CU 021            | X       |           |           |               |
| CU 022            | X       |           |           |               |
| CU 023            | X       |           |           |               |
| CU 024            | X       |           |           |               |
| CU 026            |         |           | X         |               |
| CU 027            |         |           | X         |               |
| CU 028            |         |           | X         |               |
| CU 029            |         |           | X         |               |
| CU 030            |         |           | X         |               |
| CU 031            |         |           | X         |               |
| CU 032            |         |           | X         |               |
| CU 033            |         | X         |           |               |
| CU 034            |         | X         |           |               |
| CU 035            |         | X         |           |               |
| CU 036            |         | X         |           |               |
| CU 037            |         | X         |           |               |
| CU 038            |         | X         |           |               |
| CU 039            |         | X         |           |               |
| CU 040            |         | X         |           |               |
| CU 041            |         | X         |           |               |
| CU 042            |         | X         |           |               |
| CU 043            |         | X         |           |               |
| CU 044            |         | X         |           |               |
| CU 045            |         |           |           | X             |
| CU 046            |         |           |           | X             |
| CU 047            |         |           |           | X             |
| CU 048            |         |           |           | X             |
| CU 049            |         |           |           | X             |
| CU 050            |         |           |           | X             |

---

```mermaid
%%{init: {"quadrantChart": {"pointTextPadding":-5 , "pointRadius":0, "pointLabelFontSize":20}}}%%
quadrantChart
    x-axis "Poca Influencia" --> "Mucha Influencia"
    y-axis "Poco Interés" --> "Mucho Interés"
    quadrant-1 Colaborar
    quadrant-2 Satisfacer
    quadrant-3 Observar
    quadrant-4 Comunicar
    Cliente: [0.25,0.80]
    Asistente: [0.25,0.70]
    Administrador: [0.75,0.80]
    Conductor: [0.75,0.70]

```

## Cliente

| Objetivos                      | Nivel de interés | Nivel de Influencia | Acciones Posibles de Impacto Positivo             | Acciones Posibles de Impacto Negativo        | Estrategias                                                    |
|--------------------------------|------------------|---------------------|---------------------------------------------------|----------------------------------------------|----------------------------------------------------------------|
| CU 001, CU 003-004, CU 017-024 | Alto             | Medio               | Adopción del nuevo sistema, proporcionar feedback | Resistencia al cambio, abandono del servicio | Incentivos para el uso del servicio, comunicación transparente |

## Asistente
| Objetivos              | Nivel de interés | Nivel de Influencia | Acciones Posibles de Impacto Positivo | Acciones Posibles de Impacto Negativo                         | Estrategias                                     |
|------------------------|------------------|---------------------|---------------------------------------|---------------------------------------------------------------|-------------------------------------------------|
| CU 007-008, CU 033-044 | Medio            | Medio               | Eficiencia en la gestión, feedback    | Falta de familiarización, inacción en resolución de problemas | Formación extensiva, retroalimentación continua |

## Conductor

| Objetivos                      | Nivel de interés | Nivel de Influencia | Acciones Posibles de Impacto Positivo           | Acciones Posibles de Impacto Negativo                                      | Estrategias                                            |
|--------------------------------|------------------|---------------------|-------------------------------------------------|----------------------------------------------------------------------------|--------------------------------------------------------|
| CU 002, CU 005-006, CU 026-032 | Alto             | Alto                | Participación activa, cumplimento de protocolos | Disminución de calidad de servicio, desinterés por seguir nuevas políticas | Capacitación adecuada, canales de comunicación abierto |

## Administrador

| Objetivos              | Nivel de interés | Nivel de Influencia | Acciones Posibles de Impacto Positivo             | Acciones Posibles de Impacto Negativo | Estrategias             |
|------------------------|------------------|---------------------|---------------------------------------------------|---------------------------------------|-------------------------|
| CU 009-010, CU 045-050 | Alto             | Alto                | Monitoreo y evaluación, comunicación transparente | Mala gestión del cambio               | Planificación cuidadosa |

[REGRESAR](../../README.md)