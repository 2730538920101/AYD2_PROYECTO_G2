import {test, expect} from 'playwright/test';
import path from 'path';

test('1.1 Login de Administrador ', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('mail@mail.com').fill("3004273360101@ingenieria.usac.edu.gt")
    await page.getByPlaceholder('Contraseña').fill("Adminpassword1234!")
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
    await page.getByRole('button', { name: 'Ok' }).click()
    await expect(page.getByRole('button', { name: 'Enviar Archivo' })).toBeVisible({timeout: 100000});

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#file').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '/files/clave.ayd'));
    await page.getByRole('button', { name: 'Enviar Archivo' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
})

test('1.2 Actualizar tarifas', async ({ page }) => {

    await page.goto('/');
    await page.getByPlaceholder('mail@mail.com').fill("3004273360101@ingenieria.usac.edu.gt")
    await page.getByPlaceholder('Contraseña').fill("Adminpassword1234!")
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
    await page.getByRole('button', { name: 'Ok' }).click()
    await expect(page.getByRole('button', { name: 'Enviar Archivo' })).toBeVisible({timeout: 100000});

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#file').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '/files/clave.ayd'));
    await page.getByRole('button', { name: 'Enviar Archivo' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
    await page.getByRole('button', { name: 'Ok' }).click()
    await page.goto('/');
    await page.getByLabel('scrollable content').getByRole('button', { name: 'Actualizar Tarifas' }).click()

    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.locator('#file').click();
    const fileChooser2 = await fileChooserPromise2;
    await fileChooser2.setFiles(path.join(__dirname, '/files/Tarifas.csv'));
    await page.locator('button').filter({ hasText: 'Actualizar Tarifas' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
})
