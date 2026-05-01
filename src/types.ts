export type ContentType = 'text' | 'image' | 'audio' | 'video';
export type EventSource = 'SMS' | 'WhatsApp' | 'Email' | 'Voice' | 'System';
export type ThreatStatus = 'pending' | 'analyzed' | 'acted';
export type ActionType = 'block' | 'alert' | 'report' | 'ignore';

export interface ScamEvent {
  id: string;
  created_at: string;
  source: EventSource;
  content_type: ContentType;
  raw_content: string;
  metadata: Record<string, any>;
  risk_score: number;
  status: ThreatStatus;
  agent_summary: string;
  analysis?: ScamAnalysis;
}

export interface ScamAnalysis {
  confidence: number;
  signals: string[];
  explanation: string;
  suggested_action: ActionType;
}

export interface ThreatPattern {
  id: string;
  pattern_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  last_seen: string;
}
