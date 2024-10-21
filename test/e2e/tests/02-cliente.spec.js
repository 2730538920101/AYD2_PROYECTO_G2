import {test, expect} from 'playwright/test';
import path from 'path';

test('2.1 Registro de cliente', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Registrarse como cliente' }).click()
    await page.getByPlaceholder('Nombre Apellido').fill('Andrés López')
    await page.locator('#fecha_nacimiento').fill('2000-02-29')
    await page.locator('#genero').selectOption({ label: 'Masculino' })
    await page.getByPlaceholder('direccion@correo.com').fill("feriafansomega@gmail.com")

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#foto_dpi').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '/files/blue.png'));
    await page.getByPlaceholder('88888888').fill('46056650');
    await page.locator('#contrasenia').fill("ZX12qwertyu!")
    await page.locator('#contrasenia2').fill("ZX12qwertyu!")
    await page.getByPlaceholder('¿Cuál fue el nombre de mi').fill('asd');
    await page.getByPlaceholder('Manchas').fill('asd');
    await page.getByPlaceholder('Estado').fill('Activo');
    await page.getByRole('button', { name: 'Registrarse' }).click()
    console.log(page.url())
    const success = page.getByRole('heading', { name: 'Registro Exitoso' });
    await expect(success).toBeVisible({timeout: 100000});
})

test('2.2 Login de cliente', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('mail@mail.com').fill("feriafansomega@gmail.com")
    await page.getByPlaceholder('Contraseña').fill("ZX12qwertyu!")
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
})

test('2.3 Actualizar nombre', async( {page} ) => {
    await page.goto('/');
    await page.getByPlaceholder('mail@mail.com').fill("feriafansomega@gmail.com")
    await page.getByPlaceholder('Contraseña').fill("ZX12qwertyu!")
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
    await page.goto('/');
    await page.getByRole('button', { name: 'Perfil' }).click()
    await expect(page.getByRole('button', { name: 'Actualizar' })).toBeVisible({timeout: 100000});
    await expect(page.getByPlaceholder('Nombre Apellido')).toHaveValue("Andrés López")
    await page.getByPlaceholder('Nombre Apellido').fill('José Pineda');
    await page.getByRole('button', { name: 'Actualizar' }).click()
    await page.goto('/');
    await page.getByRole('button', { name: 'Perfil' }).click()
    await expect(page.getByRole('button', { name: 'Actualizar' })).toBeVisible({timeout: 100000});
    await expect(page.getByPlaceholder('Nombre Apellido')).toHaveValue("José Pineda")
})

test('2.4 Pedir viaje', async( {page} ) => {
    await page.goto('/');
    await page.getByPlaceholder('mail@mail.com').fill("feriafansomega@gmail.com")
    await page.getByPlaceholder('Contraseña').fill("ZX12qwertyu!")
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
    await expect(page.getByRole('heading', { name: 'Hecho' })).toBeVisible({timeout: 100000});
    await page.goto('/');
    await page.getByRole('button', { name: 'Viajes' }).click()
    await expect(page.getByRole('button', { name: 'Pedir Viaje' })).toBeVisible({timeout: 100000});
    await page.getByRole('button', { name: 'Pedir Viaje' }).click()
    await expect(page.locator('#origen')).toBeVisible({timeout: 100000});
    await page.locator('#origen').selectOption({ label: 'Zona 9' })
    await page.locator('#destino').selectOption({ label: 'Zona 8' })
    await page.getByRole('button', { name: 'Pedir Viaje' }).click()
    await expect(page.getByRole('heading', { name: 'Viaje solicitado' })).toBeVisible({timeout: 100000});
    await page.getByRole('button', { name: 'OK' }).click()
    await expect(page.getByRole('button', { name: 'Cancelar viaje actual' })).toBeVisible({timeout: 100000});
})

