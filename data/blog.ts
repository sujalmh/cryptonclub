import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How we won the Regional CTF',
    date: '2023-12-05',
    excerpt: 'A deep dive into the final web exploitation challenge that secured our victory.',
    content: `
# Victory at Regionals

The final challenge involved a complex **SQL injection** vulnerability that was chained with a Local File Inclusion (LFI).

## The Reconnaissance

We started by scanning the target host using \`nmap\`:

\`\`\`bash
nmap -sC -sV -p- 10.10.10.5
\`\`\`

The scan revealed a web server running on port 8080. Upon visiting the site, we found a login page that seemed standard, but the URL parameter \`?page=login\` looked suspicious.

## The Exploit

After fuzzing the parameter, we confirmed an LFI vulnerability.

*   **Step 1**: Read \`/etc/passwd\`
*   **Step 2**: Locate the source code
*   **Step 3**: Find the hidden admin endpoint

> "Security is not a product, but a process." - Bruce Schneier

We eventually found a hardcoded API key in a config file which allowed us to bypass the SQL query filter.

## Conclusion

This CTF taught us the importance of checking for configuration files when LFI is present. Great job team!
    `,
    author: 'Sarah Jones',
    tags: ['CTF', 'Web Security']
  },
  {
    id: 'b2',
    title: 'Setting up a Home Lab',
    date: '2024-01-15',
    excerpt: 'Hardware recommendations and software stack for your personal penetration testing lab.',
    content: `
# Building Your Fortress

You do not need expensive servers. An old laptop and **Proxmox** are enough to simulate an enterprise network.

## Hardware Requirements

1.  **CPU**: At least 4 cores (Intel i5 or equivalent)
2.  **RAM**: 16GB minimum (32GB recommended)
3.  **Storage**: 500GB SSD

## Software Stack

We recommend using a Type-1 Hypervisor like Proxmox VE.

\`\`\`bash
# Download the ISO
wget https://www.proxmox.com/en/downloads
\`\`\`

### Essential VMs to Install

*   **Kali Linux**: Your attack box.
*   **Metasploitable**: A vulnerable target.
*   **Windows Active Directory**: To practice AD attacks.

Happy Hacking!
    `,
    author: 'Alex Chen',
    tags: ['Home Lab', 'Hardware']
  },
  {
    id: 'b3',
    title: 'The Future of Quantum Cryptography',
    date: '2024-03-10',
    excerpt: 'Analyzing the impact of quantum computing on current encryption standards.',
    content: `
# The Quantum Threat

RSA encryption relies on the difficulty of **prime factorization**. Quantum computers, running Shor's Algorithm, could theoretically solve this problem exponentially faster than classical computers.

## Post-Quantum Cryptography (PQC)

NIST has been working on standardizing algorithms that are resistant to quantum attacks.

### Key Candidates

1.  **Crystals-Kyber**: Key Encapsulation Mechanism (KEM)
2.  **Crystals-Dilithium**: Digital Signatures

## What should we do?

Start auditing your systems for legacy encryption protocols. Transitioning to **AES-256** is a good stopgap, as symmetric encryption is less vulnerable to quantum attacks (Grover's Algorithm only provides a quadratic speedup).
    `,
    author: 'Marcus Johnson',
    tags: ['Cryptography', 'Research']
  }
];