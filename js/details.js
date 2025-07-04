import { showHomePage } from './UI.js';

export class Details {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showHomePage();
            });
        }
    }
}