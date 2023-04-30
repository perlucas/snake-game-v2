
const phrases = [
    'Ganaste!',
    'Si querés, podés seguir jugando',
    'Pero antes, quería decirte algo',
    'Me gustás mucho',
    'Y me siento muy bien con vos',
    'Incluso cuando tenemos alguna diferencia',
    'Comprendí que hacés lo mejor para resolverla',
    'Buscando lo que nos funcione a los dos',
    'A veces, me hacés saber cuando puedo cambiar algo de mi lado',
    'Otras, sos vos la que se adapta a cómo soy o funciono',
    'Pero lo más importante, sin dudas',
    'Es que me aceptás tal y cómo soy',
    'Y eso no es algo que se encuentra en cualquier persona',
    'Tendrás que saber que no siempre soy un ser de pura iluminación...',
    'Habrá días en los que seré puro amor...',
    '...y días en los que seré un viejo cascarrabias',
    'Habrá días en los que contagie seguridad a todo el mundo...',
    '...y días en los que sea la persona más insegura del mundo...',
    'Habrá temporadas en las que tenga más pancita...',
    '...y temporadas en las que sea más fit',
    'Sabiendo de estos defectos y virtudes, y asumiendo que hay más que aun no conocés',
    'Te quiero hacer una pregunta...',
    '(ahora sí)...',
    '...',
    '(después de tanta espera)...',
    '...',
    '...Chan chan chan...',
    '...',
    'María Emilia Giménez',
    'Te invito a ponernos los títulos que tanto venimos pateando hace tiempo',
    'Te invito a continuar conociéndonos, y aprendiendo el uno del otro',
    'Te invito a ser mi novia',
    '¿Aceptás?'
]

export class Proposal {

    constructor() {
        /**
         * @private
         */
        this.currentPhraseIndex = 0
    }

    /**
     * @public
     */
    initialize() {
        this.removeDrawingCanvas()
        this.darkenScreenAndShowProposal()
    }

    /**
     * @private
     */
    removeDrawingCanvas() {
        const drawingCanvas = document.getElementById('game')
        drawingCanvas.style.display = 'none';
    }

    /**
     * @private
     */
    darkenScreenAndShowProposal() {
        // activate container
        const proposalContainer = this.proposalContainer()
        proposalContainer.className = 'proposal-on'

        // progressively darken screen
        const darkenScreenKeyframes = [
            { backgroundColor: "black" }
        ]
        const darkenScreenTiming = {
            duration: 5000,
            iterations: 1,
            fill: 'forwards'
        }

        const darkenScreenAnimation = proposalContainer.animate(darkenScreenKeyframes, darkenScreenTiming)

        // show proposal text once screen is ready
        darkenScreenAnimation.addEventListener('finish', this.renderNextPhrase.bind(this))
    }
    
    /**
     * @private
     * @returns {HTMLElement}
     */
    proposalContainer() {
        return document.getElementById('proposal')
    }

    /**
     * @private
     */
    renderNextPhrase() {
        if (this.currentPhraseIndex >= phrases.length) {
            return
        }

        const nextPhrase = phrases[ this.currentPhraseIndex ]
        this.currentPhraseIndex++

        const proposalContainer = this.proposalContainer()
        proposalContainer.innerHTML = ''
        
        // create new <div> which will hold the next phrase
        const nextPhraseContainer = document.createElement('div')
        nextPhraseContainer.className = 'proposal-text'
        proposalContainer.appendChild(nextPhraseContainer)
        nextPhraseContainer.innerText = nextPhrase

        // fade in the phrase
        const fadeInTextKeyframes = [
            { opacity: 100 }
        ]
        const fadeInTextTiming = {
            duration: 4000,
            iterations: 1,
            fill: 'forwards'
        }

        nextPhraseContainer.animate(fadeInTextKeyframes, fadeInTextTiming)

        // show next phrase on click
        nextPhraseContainer.addEventListener('click', this.renderNextPhrase.bind(this))
    }
}