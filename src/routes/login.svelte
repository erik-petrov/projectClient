<script context="module">
    export async function preload({ params }, { token }) {
        if (token) {
            this.redirect(302, `/overview`);
        }
    }
</script>

<script>
    import { goto, stores } from '@sapper/app';
    import { post } from '../node_modules/utils';
    const { session } = stores();

    let username = '';
    let password = '';
    let errors = null;

    async function submit(event) {
        const response = await post(`auth/login`, { username, password });

        errors = response.error;
        console.log(response)
        if (response.token) {
            $session.token = response.token;
            goto('/overview');
        }
    }
</script>

<svelte:head>
    <title>Sign in • Conduit</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign In</h1>
                <p class="text-xs-center">
                    <a href="/register">Need an account?</a>
                </p>

                {#if errors}
                    <div class="alert alert-danger" role="alert">{errors}</div>
                {/if}

                <form on:submit|preventDefault={submit}>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Username" bind:value={username}>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>