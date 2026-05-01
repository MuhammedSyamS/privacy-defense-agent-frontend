import { ContentType, ScamAnalysis, ActionType } from '@/types';

interface SignalSource {
  type: string;
  weight: number;
}

const SIGNALS: Record<string, SignalSource> = {
  'urgency': { type: 'psychological', weight: 30 },
  'authority': { type: 'psychological', weight: 25 },
  'suspicious_link': { type: 'technical', weight: 40 },
  'mismatched_font': { type: 'visual', weight: 35 },
  'domain_new': { type: 'technical', weight: 45 },
  'irs_keywords': { type: 'content', weight: 50 },
  'synthetic_voice': { type: 'audio', weight: 60 },
};

export class ScamShieldAgent {
  /**
   * Performs multi-modal fusion and decision making
   */
  static analyze(contentType: ContentType, content: string, metadata: any): ScamAnalysis {
    let score = 0;
    const detectedSignals: string[] = [];
    let explanation = '';
    let suggestedAction: ActionType = 'ignore';

    // 1. CONTENT-SPECIFIC ANALYSIS (SIMULATED)
    if (contentType === 'text') {
      if (content.toLowerCase().includes('urgent') || content.toLowerCase().includes('suspended')) {
        detectedSignals.push('Urgent Tone');
        score += SIGNALS.urgency.weight;
      }
      if (content.includes('http')) {
        detectedSignals.push('Suspicious Link');
        score += SIGNALS.suspicious_link.weight;
      }
    } else if (contentType === 'image') {
      detectedSignals.push('OCR Mismatch');
      detectedSignals.push('UI Inconsistency');
      score += SIGNALS.mismatched_font.weight + SIGNALS.authority.weight;
    } else if (contentType === 'audio') {
      detectedSignals.push('Synthetic Voice Heuristics');
      detectedSignals.push('IRS Impersonation');
      score += SIGNALS.synthetic_voice.weight + SIGNALS.irs_keywords.weight;
    }

    // 2. MULTI-SIGNAL FUSION & RISK SCORING
    const riskScore = Math.min(Math.round(score), 100);

    // 3. DECISION ENGINE
    if (riskScore > 85) {
      suggestedAction = 'block';
      explanation = `CRITICAL: The system detected multiple high-weight threat signals (${detectedSignals.join(', ')}). The probability of a sophisticated scam is extremely high. Automatic blocking recommended.`;
    } else if (riskScore > 60) {
      suggestedAction = 'alert';
      explanation = `WARNING: Suspicious patterns detected. While not conclusive, the presence of ${detectedSignals.join(' and ')} warrants high caution.`;
    } else if (riskScore > 30) {
      suggestedAction = 'report';
      explanation = `NOTICE: Minor anomalies detected. Logging for future pattern matching.`;
    } else {
      explanation = `System analyzed signals and found no significant threat markers. Monitoring continues.`;
    }

    return {
      confidence: 0.8 + (riskScore / 500), // Simulated confidence
      signals: detectedSignals,
      explanation,
      suggested_action: suggestedAction
    };
  }
}
