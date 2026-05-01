import { ScamEvent } from './types';

export const MOCK_EVENTS: ScamEvent[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    source: 'SMS',
    content_type: 'text',
    raw_content: 'URGENT: Your account has been suspended. Click here to verify: http://bank-secure-login.com/verify',
    metadata: { sender: '+1 234 567 8901' },
    risk_score: 95,
    status: 'analyzed',
    agent_summary: 'Critical phishing attempt detected. High urgency keywords and suspicious URL domain.',
    analysis: {
      confidence: 0.98,
      signals: ['Urgent Tone', 'Suspicious Link', 'Unrecognized Sender'],
      explanation: 'The message uses fear tactics and urgency to force a click. The domain bank-secure-login.com was registered 2 days ago.',
      suggested_action: 'block'
    }
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    source: 'WhatsApp',
    content_type: 'image',
    raw_content: '/mock-images/fake-payment.png',
    metadata: { sender: 'Unknown' },
    risk_score: 88,
    status: 'analyzed',
    agent_summary: 'Forged payment confirmation screenshot. OCR reveals font mismatch in transaction ID.',
    analysis: {
      confidence: 0.92,
      signals: ['OCR Mismatch', 'UI Inconsistency', 'Non-standard Font'],
      explanation: 'Visual analysis shows the transaction amount font does not match the official bank template. Transaction ID is invalid.',
      suggested_action: 'report'
    }
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    source: 'Voice',
    content_type: 'audio',
    raw_content: '/mock-audio/scam-call.mp3',
    metadata: { sender: 'Restricted' },
    risk_score: 72,
    status: 'analyzed',
    agent_summary: 'Social engineering detected in voice call. Impersonation of IRS agent.',
    analysis: {
      confidence: 0.85,
      signals: ['IRS Impersonation', 'Threat of Legal Action', 'Robotic Voice Heuristics'],
      explanation: 'Transcript analysis indicates high frequency of "immediate payment" and "legal consequences" keywords common in IRS scams.',
      suggested_action: 'alert'
    }
  }
];
