export function jsonify(formData) {
    let valueq = [...formData]
    const obj = {};
    valueq.forEach(([key, value]) => {
        obj[key] = value
    })
    return obj
}

export function RemoveComponent(name) {
    document.querySelectorAll(name).forEach((comp) => {
        comp.remove()
    })
}

export function loadCSS(path) {
    return new Promise((resolve, reject) => {
        const link = document.querySelector("link");
        if (link) {
            link.href = path;
            resolve();
        } else {
            console.error("Link element not found in head");
            reject();
        }
    });
}

export function convertBytes(bytes) {
    if (bytes / 1000000 < 1) {
        return [(bytes / 1000).toFixed(2), "KB"]
    }
    return [(bytes / 1000000).toFixed(2), "MB"]
}

const ranksDefinitions = [
    {
        "name": "Aspiring developer",
        "level": 0,
        "milestone": "Passed the piscine"
    },
    {
        "name": "Beginner developer",
        "level": 10
    },
    {
        "name": "Apprentice developer",
        "level": 20
    },
    {
        "name": "Assistant developer",
        "level": 30
    },
    {
        "name": "Basic developer",
        "level": 40
    },
    {
        "name": "Junior developer",
        "level": 50
    },
    {
        "name": "Confirmed developer",
        "level": 55
    },
    {
        "name": "Full-Stack developer",
        "level": 60
    }
]

export function getRankName(level) {
    for (let i = 0; i < ranksDefinitions.length; i++) {
        if (level < ranksDefinitions[i].level) {
            return ranksDefinitions[i - 1].name;
        }
    }
    return ranksDefinitions[ranksDefinitions.length - 1].name;
}

export function calculateAudits(grades) {
    let total = grades.length;
    let invalid = 0;
    let valid = 0;

    for (let i = 0; i < grades.length; i++) {
        if (grades[i].grade < 1) {
            invalid++;
        } else {
            valid++;
        }
    }

    return {
        total: total,
        invalid: invalid,
        valid: valid
    };
}

export function extractProjectDetails(projects) {
    return projects.map(project => ({
        name: project.object.name,
        amount: project.amount
    }));
}

export function encodeBase64(str) {
    var encoder = new TextEncoder();
    var byteArray = encoder.encode(str);
    var base64String = arrayBufferToBase64(byteArray);
    return base64String;
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}