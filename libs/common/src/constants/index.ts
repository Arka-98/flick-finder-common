export const TOPICS: Record<
  string,
  Record<'CREATED' | 'UPDATED' | 'DELETED', string>
> = {
  USER: {
    CREATED: 'user.created',
    UPDATED: 'user.updated',
    DELETED: 'user.deleted',
  },
};
