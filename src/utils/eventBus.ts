type EventHandler = (...args: any[]) => void;

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  on(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event)!.push(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: EventHandler) {
    const handlers = this.handlers.get(event);
    if (handlers) this.handlers.set(event, handlers.filter(h => h !== handler));
  }

  emit(event: string, ...args: any[]) {
    this.handlers.get(event)?.forEach(h => h(...args));
  }

  clear() {
    this.handlers.clear();
  }
}

export const eventBus = new EventBus();

export const EVENTS = {
  CLOCK_IN: 'clock:in',
  CLOCK_OUT: 'clock:out',
  LEAVE_REQUESTED: 'leave:requested',
  LEAVE_APPROVED: 'leave:approved',
  LEAVE_REJECTED: 'leave:rejected',
  PAYSLIP_GENERATED: 'payslip:generated',
  PAYMENT_PROCESSED: 'payment:processed',
  CANDIDATE_ADDED: 'candidate:added',
  OBJECTIVE_UPDATED: 'objective:updated',
  REVIEW_SUBMITTED: 'review:submitted',
  TRANSACTION_ADDED: 'transaction:added',
  TAX_SUBMITTED: 'tax:submitted',
  MISSION_UPDATED: 'mission:updated',
  EXPENSE_UPDATED: 'expense:updated',
  ENROLLMENT_CREATED: 'enrollment:created',
  NOTIFICATION_SENT: 'notification:sent',
  VAULT_ITEM_ADDED: 'vault:added',
  REWARD_EARNED: 'reward:earned',
  REWARD_REDEEMED: 'reward:redeemed',
  EQUIPMENT_ASSIGNED: 'equipment:assigned',
  SURVEY_SUBMITTED: 'survey:submitted',
  ADVANCE_REQUESTED: 'advance:requested',
  ADVANCE_APPROVED: 'advance:approved',
  ADVANCE_PAID: 'advance:paid',
  QUIZ_COMPLETED: 'quiz:completed',
  CERTIFICATE_ISSUED: 'certificate:issued',
  SIGNATURE_SENT: 'signature:sent',
  SIGNATURE_SIGNED: 'signature:signed',
  SIGNATURE_COMPLETED: 'signature:completed',
} as const;
