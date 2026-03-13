function generateCPF() {
    const randomDigits = () => Math.floor(Math.random() * 9);
    
    // Gera os 9 primeiros dígitos
    let digits = Array.from({ length: 9 }, randomDigits);
    
    // Calcula o primeiro dígito verificador
    digits.push(calculateDigit(digits));
    
    // Calcula o segundo dígito verificador
    digits.push(calculateDigit(digits));
    
    return formatCPF(digits.join(''));
}

function calculateDigit(baseDigits) {
    let multiplier = baseDigits.length + 1;
    let sum = baseDigits.reduce((acc, curr) => acc + (curr * multiplier--), 0);
    let result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
}

function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function generateAndDisplay() {
    const cpf = generateCPF();
    document.getElementById('cpfDisplay').value = cpf;
    document.getElementById('copyBtn').innerText = "Copiar";
}

function copyToClipboard() {
    const copyText = document.getElementById("cpfDisplay");
    if (!copyText.value) return;
    
    navigator.clipboard.writeText(copyText.value);
    document.getElementById('copyBtn').innerText = "Copiado!";
}

// Gera um ao carregar a página
window.onload = generateAndDisplay;