async function createSession(){
    const session = await bb.sessions.create({
      projectId: `94ba3318-cabd-4f85-8eb5-fcc6a0e67195`,
    });
    console.dir(session, { depth: null });
    return session;
}

createSession();
