connectToDatabase().then(database => {
  return getUser(database, 'email@email.com').then(user => {
    return getUserSettings(database, user.id).then(settings => {
      return setRole(database, user.id, 'ADMIN').then(success => {
        return notifyUser(user.id, 'USER_ROLE_UPDATED').then(success => {
          return notifyAdmins('USER_ROLE_UPDATED');
        });
      });
    });
  });
});

const Roles = {
  Admin: 'ADMIN',
};

const Actions = {
  UserRoleUpdated: 'USER_ROLE_UPDATED',
};

const connect = async () => {
  const database = await connectToDatabase().catch(e => console.error('db connection error', e.message));
  const user = await getUser(database, 'email@email.com').catch(e => console.error('getUser error', e.message));
  const settings = await getUserSettings(database, user.id).catch(e => console.error('settings error', e.message));
  const isAdmin = await setRole(database, user.id, Roles.Admin).catch(e => console.error('set role error', e.message));
  const userNotified = await notifyUser(user.id, Actions.UserRoleUpdated).catch(e =>
    console.error('user notification error', e.message),
  );

  if (userNotified) {
    return notifyAdmins(Actions.UserRoleUpdated);
  }
};
